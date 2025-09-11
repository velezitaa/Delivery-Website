import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async () => {
  const response = await db.query(`SELECT * FROM products`);
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO products (name, price)
    VALUES ($1, $2) RETURNING *
  `,
    [payload.name, payload.price],
  );
  return response.rows[0];
};

const deleteOneById = async (payload) => {
  const response = await db.query(
    `
    DELETE FROM products
    WHERE id = $1 RETURNING *
  `,
    [payload.productId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El producto no fue encontrado');
  }
  return response.rows[0];
};

const updateOneById = async (id, payload) => {
  const response = await db.query(
    `
    UPDATE products
    SET name = $1, price = $2
    WHERE id = $3
    RETURNING *
  `,
    [payload.name, payload.price, id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El contacto no fue encontrado');
  }
  return response.rows[0];
};

const productsRepository = { getAll, addOne, deleteOneById, updateOneById };

export default productsRepository;
