import db from '../../../db/index.js';
import { ErrorWithStatus } from '../../../utils/errorTypes.js';

const getAll = async () => {
  const response = await db.query(`SELECT * FROM user_order`);
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO user_order (date, status, payment_method_id, user_id, payment_reference, monto)
    VALUES (NOW(), 'preparacion', $1, $2, $3, $4) RETURNING *
  `,
    [payload.payment_method_id, payload.user_id, payload.payment_reference, payload.monto],
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

const getByPaymentStatus = async (status) => {
  const response = await db.query(
    `
    SELECT
      uo.id,
      uo.date,
      uo.payment_reference,
      uo.monto,
      pm.bank AS bank_name,
      u.email AS user_email
    FROM user_order uo
    JOIN payment_method pm ON uo.payment_method_id = pm.id
    JOIN users u ON uo.user_id = u.id
    WHERE uo.payment_status = $1
    ORDER BY uo.date DESC
  `,
    [status],
  );
  return response.rows;
};

const updatePaymentStatus = async (orderId, newStatus) => {
  const response = await db.query(
    `
    UPDATE user_order
    SET payment_status = $1
    WHERE id = $2
    RETURNING *
  `,
    [newStatus, orderId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'La orden no fue encontrada.');
  }
  return response.rows[0];
};

// Para que un usuario pueda ver todas sus órdenes
const getByUserId = async (userId) => {
  const response = await db.query(
    `
    SELECT
      id,
      date,
      status,
      payment_status,
      payment_reference,
      monto
    FROM user_order
    WHERE user_id = $1
    ORDER BY date DESC
  `,
    [userId],
  );
  return response.rows;
};

const orderRepository = {
  getAll,
  addOne,
  deleteOneById, //updateOneById
  getByPaymentStatus,
  updatePaymentStatus,
  getByUserId,
};

export default orderRepository;
