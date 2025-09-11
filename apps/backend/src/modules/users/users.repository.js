import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async ({ role }) => {
  const response = await db.query(`SELECT * FROM users WHERE role = $1`, [role]);
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO users (email, password_hash, role)
    VALUES ($1, $2, $3) RETURNING *
  `,
    [payload.email, payload.passwordHash, payload.role],
  );
  return response.rows[0];
};

const deleteOneById = async (payload) => {
  const response = await db.query(
    `
    DELETE FROM users
    WHERE id = $1 RETURNING *
  `,
    [payload.usersId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El usuario no fue encontrado');
  }
  return response.rows[0];
};

const updateOneById = async (id, payload) => {
  const response = await db.query(
    `
    UPDATE users
    SET email = $1
    WHERE id = $2
    RETURNING *
  `,
    [payload.email, id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El usuario no fue encontrado');
  }
  return response.rows[0];
};

const verifyOne = async (payload) => {
  const response = await db.query(
    `
    UPDATE users
    SET verify_email = true
    WHERE id = $1
    RETURNING *
  `,
    [payload.id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(400, 'Token malformado');
  }
  return response.rows[0];
};

const findByEmail = async (payload) => {
  const response = await db.query(
    `
    SELECT * FROM users
    WHERE email = $1
  `,
    [payload.email],
  );
  return response.rows[0];
};

const usersRepository = { getAll, addOne, deleteOneById, updateOneById, verifyOne, findByEmail };

export default usersRepository;
