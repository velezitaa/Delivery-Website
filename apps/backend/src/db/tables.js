import db from './index.js';

const createUsersTable = async () => {
  await db.query('DROP TABLE IF EXISTS users');
  await db.query(`
  CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'client',
  verify_email BOOLEAN DEFAULT false
    )
  `);
  console.log('Tabla de usuarios creada');
};

const createProductsTable = async () => {
  await db.query('DROP TABLE IF EXISTS products');
  await db.query(`
  CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL
    )
  `);
  console.log('Tabla de productos creada');
};

const createPaymentMethodTable = async () => {
  await db.query('DROP TABLE IF EXISTS payment_method');
  await db.query(`
  CREATE TABLE payment_method (
  id SERIAL PRIMARY KEY,
  bank TEXT NOT NULL,
  phone TEXT NOT NULL,
  cedula TEXT NOT NULL
    )
  `);
  console.log('Tabla de métodos de pago creada');
};

const createOrderStatusType = async () => {
  await db.query(`DROP TYPE IF EXISTS order_status CASCADE`);
  await db.query(`
    CREATE TYPE order_status AS enum ('preparacion', 'preparado', 'camino', 'recibido')
  `);
};

const createPaymentStatusType = async () => {
  await db.query(`DROP TYPE IF EXISTS payment_status CASCADE`);
  await db.query(`
    CREATE TYPE payment_status AS enum ('pendiente', 'aceptado', 'rechazado')
  `);
};

const createOrderTable = async () => {
  await db.query(`
  CREATE TABLE user_order (
  id SERIAL PRIMARY KEY,
  date TIMESTAMPTZ DEFAULT NOW(),
  status order_status,
  payment_status payment_status DEFAULT 'pendiente',
  payment_reference TEXT, 
  monto NUMERIC NOT NULL,
  payment_method_id INTEGER NOT NULL REFERENCES payment_method(id) ON DELETE SET NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
    )
  `);
  console.log('Tabla del pedido creada');
};

const createOrderProductsTable = async () => {
  await db.query(`
  CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES user_order(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1
    )
  `);
  console.log('Tabla de detalles del pedido creada');
};

const deleteAllTables = async () => {
  await db.query('DROP TABLE IF EXISTS user_order CASCADE');
  await db.query('DROP TABLE IF EXISTS order_products CASCADE');
};

const createTables = async () => {
  await deleteAllTables();
  await createUsersTable();
  await createProductsTable();
  await createPaymentMethodTable();
  await createOrderStatusType();
  await createPaymentStatusType();
  await createOrderTable();
  await createOrderProductsTable();
  console.log('Tablas creadas correctamente');
  process.exit(0);
};

createTables();
