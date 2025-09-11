// src/components/riders/riders.module.js
import { atom } from "nanostores";
import { createNotification } from "../../features/notifications/notification.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";

const BASE_URL = `${BACK_ENDPOINT}/api/users`;

/** @typedef Rider
  * @type {object}
  * @property {number} id
  * @property {string} email
  * @property {string} role
*/

/** @type {Rider[]} */
let ridersArray = [];
export const riders = atom(ridersArray);

const getRiders = async () => {
  try {
    const ridersData = await ky.get(`${BASE_URL}/repartidor`, {
      credentials: 'include'
    }).json();
    riders.set(ridersData);
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      location.replace('/login');
    }
    console.error(error);
  }
};

const addRider = async (riderToCreate) => {
  try {
    const riderCreated = await ky.post(`${BASE_URL}/repartidor`, { json: { ...riderToCreate, role: 'repartidor' }, credentials: 'include'}).json();
    riders.set(riders.get().concat(riderCreated));
    createNotification({title: 'Repartidor creado!', type: 'success'});
  } catch (error) {
    console.error(error);
    const errorData = await error.response.json();
    createNotification({
      title: 'Ups! Hubo un error',
      description: errorData.error,
      type: 'error'
    });
  }
};

// 💡 Agregar funciones de eliminar y actualizar despues!!!!

/**
 * Actualiza un repartidor
 * @param {Rider} riderToUpdate
*/
const updateRider = async (riderToUpdate) => {
  const url = `${BASE_URL}/repartidor/${riderToUpdate.id}`;
  try {
    const riderUpdated = await ky.put(url, { json: riderToUpdate, credentials: 'include' }).json();
    riders.set(riders.get().map((rider) => {
      if (rider.id === riderUpdated.id) {
        return riderUpdated;
      }
      return rider;
    }));
    createNotification({
      title: 'Repartidor actualizado!',
      description: `${riderUpdated.email}`,
      type: 'success',
    });
  } catch (error) {
    console.error(error);
    const errorData = await error.response.json();
    createNotification({
      title: 'Ups! Hubo un error',
      description: errorData.error,
      type: 'error',
    });
  }
};

/**
 * Elimina un repartidor
 * @param {number} id
*/
const removeRider = async (id) => {
  const url = `${BASE_URL}/repartidor/${id}`;
  try {
    const riderDeleted = await ky.delete(url, { credentials: 'include' }).json();
    riders.set(riders.get().filter((rider) => rider.id != riderDeleted.id));
    createNotification({
      title: 'Repartidor eliminado!',
      description: `${riderDeleted.email}`,
      type: 'success',
    });
  } catch (error) {
    console.error(error);
    const errorData = await error.response.json();
    createNotification({
      title: 'Ups! Hubo un error',
      description: errorData.error,
      type: 'error',
    });
  }
};

export default {
  addRider,
  getRiders,
  updateRider,
  removeRider,
};