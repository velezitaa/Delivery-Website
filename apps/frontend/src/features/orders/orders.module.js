import { atom } from "nanostores";
import ky from "ky";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import { createNotification } from "../notifications/notification.js";
const BASE_URL = `${BACK_ENDPOINT}/api/cart/order`;
const PRODUCTS_URL = `${BACK_ENDPOINT}/api/cart/orderProducts`;

// Estado para guardar las órdenes del usuario
export const userOrders = atom([]);

// Estado para las órdenes pendientes (para el admin)
export const pendingOrders = atom([]);

/**
 * @typedef OrderPayload
 * @type {object}
 * @property {number} payment_method_id - ID del método de pago.
 * @property {string} payment_reference - Referencia de 4 dígitos.
 * @property {number} monto - Monto total del pago.
 * @property {number} user_id - ID del usuario.
 * @property {Array<Object>} items - Array de productos del carrito.
 */

/**
 * Crea una nueva orden en la base de datos y le añade los productos del carrito.
 * @param {OrderPayload} payload - Los datos del formulario y el carrito.
 */
export const createOrderWithProducts = async (payload) => {
  try {
    // 1. Crear la orden de pago en la base de datos
    const orderResponse = await ky.post(`${BASE_URL}/`, {
      json: {
        payment_method_id: payload.payment_method_id,
        payment_reference: payload.payment_reference,
        monto: payload.monto,
        user_id: payload.user_id,
      },
      credentials: "include",
    }).json();

    const orderId = orderResponse.id;

    // 2. Sincronizar cada producto del carrito con la base de datos
    for (const item of payload.items) {
      await ky.post(`${PRODUCTS_URL}/${orderId}`, {
        json: {
          productId: item.productId,
          quantity: item.quantity,
        },
        credentials: "include",
      });
    }

    return orderId;
  } catch (error) {
    console.error("Error al crear la orden y sincronizar productos:", error);
    let description = "No se pudo registrar tu pago. Inténtalo de nuevo.";
    if (error.response) {
      const errorData = await error.response.json();
      description = errorData.error;
    }
    createNotification({
      title: "Error",
      description,
      type: "error",
    });
    throw error;
  }
};

/**
 * Obtiene el historial de órdenes para un usuario específico.
 * @param {number} userId - El ID del usuario.
 */
const getUserOrders = async (userId) => {
  try {
    const ordersData = await ky.get(`${BASE_URL}/user/${userId}`).json();
    userOrders.set(ordersData);
  } catch (error) {
    console.error("Error al obtener las órdenes del usuario:", error);
    createNotification({
      title: 'Error',
      description: 'No se pudieron cargar tus órdenes.',
      type: 'error'
    });
  }
};

/**
 * Obtiene todas las órdenes con estado de pago 'pendiente'.
 */
const getPendingOrders = async () => {
    try {
        const ordersData = await ky.get(`${BASE_URL}/pending`).json();
        pendingOrders.set(ordersData);
    } catch (error) {
        console.error("Error al obtener órdenes pendientes:", error);
        createNotification({
          title: 'Error',
          description: 'No se pudieron cargar las órdenes pendientes.',
          type: 'error'
        });
    }
};

/**
 * Actualiza el estado de pago de una orden (aceptado o rechazado).
 * @param {number} orderId - El ID de la orden a actualizar.
 * @param {'aceptado' | 'rechazado'} newStatus - El nuevo estado del pago.
 */
const updatePaymentStatus = async (orderId, newStatus) => {
  try {
    const updatedOrder = await ky.patch(`${BASE_URL}/${orderId}/payment-status`, {
      json: { payment_status: newStatus },
    }).json();

    // Actualiza el estado local eliminando la orden de la lista de pendientes
    const currentPending = pendingOrders.get();
    pendingOrders.set(currentPending.filter(order => order.id !== orderId));
    
    createNotification({
      title: `Pago ${newStatus}`,
      description: `La orden #${orderId} ha sido actualizada.`,
      type: 'success'
    });

    return updatedOrder;
  } catch (error) {
    console.error("Error al actualizar el estado del pago:", error);
    createNotification({
      title: 'Error',
      description: 'No se pudo actualizar la orden.',
      type: 'error'
    });
    throw error;
  }
};


const ordersModule = {
  createOrderWithProducts,
  getUserOrders,
  getPendingOrders,
  updatePaymentStatus,
};

export default ordersModule;