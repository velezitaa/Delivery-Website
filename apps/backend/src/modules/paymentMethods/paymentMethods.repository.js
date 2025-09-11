import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async () => {
  const response = await db.query(`SELECT * FROM payment_method`);
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO payment_method (bank, phone, cedula)
    VALUES ($1, $2, $3) RETURNING *
  `,
    [payload.bank, payload.phone, payload.cedula],
  );
  return response.rows[0];
};

const deleteOneById = async (payload) => {
  const response = await db.query(
    `
    DELETE FROM payment_method
    WHERE id = $1 RETURNING *
  `,
    [payload.paymentMethodId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El producto no fue encontrado');
  }
  return response.rows[0];
};

const updateOneById = async (id, payload) => {
  const response = await db.query(
    `
    UPDATE payment_method
    SET bank = $1, phone = $2, cedula = $3
    WHERE id = $4
    RETURNING *
  `,
    [payload.bank, payload.phone, payload.cedula, id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El contacto no fue encontrado');
  }
  return response.rows[0];
};

const paymentMethodsRepository = { getAll, addOne, deleteOneById, updateOneById };

export default paymentMethodsRepository;
