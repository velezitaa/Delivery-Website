import db from '../../../db/index.js';
import { ErrorWithStatus } from '../../../utils/errorTypes.js';

const getOrderProducts = async (orderId) => {
  const response = await db.query(
    `
    SELECT * FROM order_products WHERE order_id = $1
  `,
    [orderId],
  );
  return response.rows;
};

const addProductToOrder = async (payload) => {
  // Verificar si el producto ya existe en la orden
  const checkResponse = await db.query(
    `
    SELECT * FROM order_products WHERE order_id = $1 AND product_id = $2
    `,
    [payload.orderId, payload.productId],
  );

  const existingProduct = checkResponse.rows[0];

  if (existingProduct) {
    // Si el producto ya existe, actualizar cantidad
    const newQuantity = existingProduct.quantity + payload.quantity;
    const updateResponse = await db.query(
      `
      UPDATE order_products
      SET quantity = $1
      WHERE order_id = $2 AND product_id = $3
      RETURNING *
      `,
      [newQuantity, payload.orderId, payload.productId],
    );
    return updateResponse.rows[0];
  } else {
    // Si el producto no existe, insertar como nuevo
    const insertResponse = await db.query(
      `
      INSERT INTO order_products (order_id, product_id, quantity)
      VALUES ($1, $2, $3) 
      RETURNING *
      `,
      [payload.orderId, payload.productId, payload.quantity],
    );
    return insertResponse.rows[0];
  }
};

const removeProductFromOrder = async (payload) => {
  const response = await db.query(
    `
    DELETE FROM order_products
    WHERE order_id = $1 AND product_id = $2 RETURNING *
  `,
    [payload.orderId, payload.productId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El producto no fue encontrado en la orden');
  }
  return response.rows[0];
};

const updateProductQuantity = async (payload) => {
  const response = await db.query(
    `
    UPDATE order_products
    SET quantity = $1
    WHERE order_id = $2 AND product_id = $3 RETURNING *
  `,
    [payload.newQuantity, payload.orderId, payload.productId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El producto no fue encontrado en la orden');
  }
  return response.rows[0];
};

export default {
  addProductToOrder,
  getOrderProducts,
  removeProductFromOrder,
  updateProductQuantity,
};
