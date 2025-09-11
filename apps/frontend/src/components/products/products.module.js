import { atom } from "nanostores";
import { createNotification } from "../../features/notifications/notification.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js"; 
import ky from "ky"; 
const BASE_URL = `${BACK_ENDPOINT}/api/products`;

/** 
  * @typedef Product
  * @type {object}
  * @property {number} id El id del producto
  * @property {string} name El nombre del producto
  * @property {number} price El precio del producto
*/

export const products = atom([]);

export const productsFiltered = atom([]);

const getProducts = async () => {
  try {
    const productsData = await ky.get(BASE_URL, {
      credentials: 'include'
    }).json();
    products.set(productsData);
    // productsFiltered.set(productsData);  
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      location.replace('/login');
    }
    console.log(error);
  }
};


/** * Agrega un producto.
  * @param {object} productToCreate El nuevo producto
  * @param {string} productToCreate.name El nombre del producto
  * @param {number} productToCreate.price El precio del producto
*/
const addProduct = async (productToCreate) => {
  try {
    const productCreated = await ky.post(BASE_URL, {json: productToCreate, credentials: 'include'}).json();
    products.set(products.get().concat(productCreated));
    productsFiltered.set(productsFiltered.get().concat(productCreated));
    createNotification({title: 'Producto creado!',type: 'success'});
  } catch (error) {
    console.log(error);
    const errorData = await error.response.json();
    createNotification({
      title: 'Ups! Hubo un error',
      description: errorData.error,
      type: 'error'
    });
  }
};


/**
  * Actualiza un producto.
  * @param {Product} productToUpdate
*/
const updateProduct = async (productToUpdate) => {
  const url = `${BASE_URL}/${productToUpdate.id}`;
  try {
    const productUpdated = await ky.put(url, {json: productToUpdate, credentials: 'include'}).json();
    products.set(products.get().map(product => {
      if (product.id == productUpdated.id) { 
        return productUpdated;
      } else {
        return product;
      }
    }));
    productsFiltered.set(productsFiltered.get().map(product => {
      if (product.id == productUpdated.id) { 
        return productUpdated;
      } else {
        return product;
      }
    }));
    createNotification({
      title: 'Producto actualizado!',
      description: `${productUpdated.name}`,
      type: 'success'
    });
  } catch (error) {
    console.log(error);
    const errorData = await error.response.json();
    createNotification({
      title: 'Ups! Hubo un error',
      description: errorData.error,
      type: 'error'
    });
  }
};


/**
  * Elimina un producto.
  * @param {string} id El id del producto a eliminar
*/
const removeProduct = async (id) => {
  const url = `${BASE_URL}/${id}`;
  try {
    const productDeleted = await ky.delete(url, { credentials: 'include'}).json();
    products.set(products.get().filter(product => product.id != productDeleted.id));
    productsFiltered.set(productsFiltered.get().filter(product => product.id != productDeleted.id));
    createNotification({
      title: 'Producto eliminado!',
      description: `${productDeleted.name}`,
      type: 'success'
    });
  } catch (error) {
    console.log(error);
    const errorData = await error.response.json();
    createNotification({
      title: 'Ups! Hubo un error',
      description: errorData.error,
      type: 'error'
    });
  }
};

export default {
  addProduct,
  removeProduct,
  updateProduct,
  getProducts
};