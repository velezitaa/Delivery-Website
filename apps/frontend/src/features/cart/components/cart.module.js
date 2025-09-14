import { atom } from "nanostores";
import { createNotification } from "../../notifications/notification.js";
import { BACK_ENDPOINT } from "../../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/cart/orderProducts`;
const CART_STORAGE_KEY = 'localCart';

// ------------------------------------------------------------------------------------------
// Parte 1: Funciones para manejar el carrito en localStorage
// ------------------------------------------------------------------------------------------

/**
 * @typedef CartItem
 * @type {object}
 * @property {number} productId - El ID del producto.
 * @property {number} quantity - La cantidad del producto en el carrito.
 * @property {string} name - El nombre del producto. 
 * @property {number} price - El precio del producto. 
 */

// Obtener el carrito de localStorage
const getCartFromLocalStorage = () => {
  try {
    const localCart = localStorage.getItem(CART_STORAGE_KEY);
    return localCart ? JSON.parse(localCart) : [];
  } catch (error) {
    console.error("Error al obtener el carrito de localStorage:", error);
    return [];
  }
};

// El estado global del carrito. Lo inicializamos con los datos de localStorage.
export const cart = atom(getCartFromLocalStorage());

// Guardar el carrito en localStorage
const saveCartToLocalStorage = (cartData) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
  cart.set(cartData);
};

// Agregar un producto al carrito de localStorage
const addProductToLocalStorage = ({ productId, quantity = 1, name, price }) => {
  const currentCart = getCartFromLocalStorage();
  const existingProductIndex = currentCart.findIndex(item => item.productId === productId);

  if (existingProductIndex > -1) {
    currentCart[existingProductIndex].quantity += quantity;
  } else {
    currentCart.push({ productId, quantity, name, price });
  }

  saveCartToLocalStorage(currentCart);
  createNotification({
    title: 'Producto añadido',
    description: 'El producto se agregó a tu carrito.',
    type: 'success'
  });
};

// Actualizar la cantidad de un producto
const updateProductQuantityInLocalStorage = ({ productId, newQuantity }) => {
  if (newQuantity <= 0) {
    removeProductFromLocalStorage({ productId });
    return;
  }
  const currentCart = getCartFromLocalStorage();
  const updatedCart = currentCart.map(item =>
    item.productId === productId ? { ...item, quantity: newQuantity } : item
  );
  saveCartToLocalStorage(updatedCart);
};

// Eliminar un producto del carrito
const removeProductFromLocalStorage = ({ productId }) => {
  const currentCart = getCartFromLocalStorage();
  const updatedCart = currentCart.filter(item => item.productId !== productId);
  saveCartToLocalStorage(updatedCart);
};

// ------------------------------------------------------------------------------------------
// Parte 2: Funciones para manejar el carrito cuando el usuario está logueado
// ------------------------------------------------------------------------------------------

// Obtener el carrito de la base de datos.
const getCartFromDatabase = async (orderId) => {
  try {
    const productsInOrder = await ky.get(`${BASE_URL}/${orderId}`, { credentials: 'include' }).json();
    return productsInOrder.map(item => ({
      ...item,
      name: item.product_name,
      price: item.product_price
    }));
  } catch (error) {
    console.error("Error al obtener el carrito de la base de datos:", error);
    return [];
  }
};

// Sincronizar el carrito de localStorage a la base de datos.
const syncCartWithDatabase = async (userId) => {
  const localCart = getCartFromLocalStorage();
  if (localCart.length === 0) {
    return;
  }

  try {
    // 1. Crea una nueva orden para el usuario
    const orderResponse = await ky.post(`${BACK_ENDPOINT}/api/cart/order`, {
      json: {
        date: new Date().toISOString(),
        status: 'preparacion',
        payment_method_id: 1, // Puedes usar un ID por defecto o pedirlo en la interfaz
        user_id: userId
      },
      credentials: 'include'
    }).json();

    const orderId = orderResponse.id;

    // 2. Agregar producto del carrito local a la nueva orden en la DB
    for (const item of localCart) {
      await ky.post(`${BASE_URL}/${orderId}`, {
        json: { productId: item.productId, quantity: item.quantity },
        credentials: 'include'
      });
    }

    // 3. Limpia el carrito local y actualiza el estado global
    localStorage.removeItem(CART_STORAGE_KEY);
    cart.set([]);
    
    createNotification({
      title: 'Carrito sincronizado',
      description: 'Tu carrito se ha guardado en tu cuenta.',
      type: 'success'
    });
    
  } catch (error) {
    console.error("Error al sincronizar el carrito:", error);
    createNotification({
      title: 'Error de sincronización',
      description: 'No se pudo guardar tu carrito en la cuenta.',
      type: 'error'
    });
  }
};

const cartService = {
  updateProductQuantityInLocalStorage,
  removeProductFromLocalStorage,
  addProductToLocalStorage,
  getCartFromLocalStorage,
  getCartFromDatabase,
  syncCartWithDatabase, 
};

export default cartService