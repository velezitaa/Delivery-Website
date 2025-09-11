import { atom } from "nanostores";
import { createNotification } from "../../features/notifications/notification.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/paymentMethods`;

/** 
  * @typedef PaymentMethod
  * @type {object}
  * @property {number} id
  * @property {string} bank
  * @property {string} phone
  * @property {string} cedula
*/

/** @type {PaymentMethod[]} */
let paymentMethodsArray = [];
export const paymentMethods = atom(paymentMethodsArray);

const getPaymentMethods = async () => {
  try {
    const paymentMethodsData = await ky.get(BASE_URL, {
      credentials: 'include'
    }).json();
    paymentMethods.set(paymentMethodsData);
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      location.replace('/login');
    }
    console.error(error);
  }
};

const addPaymentMethod = async (paymentMethodToCreate) => {
  try {
    const paymentMethodCreated = await ky.post(BASE_URL, {json: paymentMethodToCreate, credentials: 'include'}).json();
    paymentMethods.set(paymentMethods.get().concat(paymentMethodCreated));
    createNotification({title: 'Método de pago creado!',type: 'success'});
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

const updatePaymentMethod = async (paymentMethodToUpdate) => {
  const url = `${BASE_URL}/${paymentMethodToUpdate.id}`;
  try {
    const paymentMethodUpdated = await ky.put(url, {json: paymentMethodToUpdate, credentials: 'include'}).json();
    paymentMethods.set(paymentMethods.get().map(method => {
      if (method.id == paymentMethodUpdated.id) {
        return paymentMethodUpdated;
      } else {
        return method;
      }
    }));
    createNotification({
      title: 'Método de pago actualizado!',
      description: `${paymentMethodUpdated.bank}`,
      type: 'success'
    });
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

const removePaymentMethod = async (id) => {
  const url = `${BASE_URL}/${id}`;
  try {
    const paymentMethodDeleted = await ky.delete(url, { credentials: 'include'}).json();
    paymentMethods.set(paymentMethods.get().filter(method => method.id != paymentMethodDeleted.id));
    createNotification({
      title: 'Método de pago eliminado!',
      description: `${paymentMethodDeleted.bank}`,
      type: 'success'
    });
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

export default {
  addPaymentMethod,
  removePaymentMethod,
  updatePaymentMethod,
  getPaymentMethods
};