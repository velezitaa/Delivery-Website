import db from '../../../db/index.js';
import { ErrorWithStatus } from '../../../utils/errorTypes.js';

const getAll = async () => {
  const response = await db.query(`SELECT * FROM user_order`);
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO user_order (date, status, payment_method_id, user_id)
    VALUES ($1, $2, $3, $4) RETURNING *
  `,
    [payload.date, payload.status, payload.payment_method_id, payload.user_id],
  );
  return response.rows[0];
};

const deleteOneById = async (payload) => {
  const response = await db.query(
    `
    DELETE FROM user_order
    WHERE id = $1 AND user_id = $2  RETURNING *
  `,
    [payload.orderId, payload.userId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'La orden no fue encontrada');
  }
  return response.rows[0];
};

// const updateOneById = async (id, payload) => {
//   const response = await db.query(
//     `
//     UPDATE user_order
//     SET status = $1
//     WHERE id = $2 AND user_id = $3
//     RETURNING *
//   `,
//     [payload.status, id, payload.userId],
//   );
//   if (response.rowCount === 0) {
//     throw new ErrorWithStatus(404, 'La orden no fue encontrada');
//   }
//   return response.rows[0];
// };

const orderRepository = {
  getAll,
  addOne,
  deleteOneById, //updateOneById
};

export default orderRepository;
