import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  createRiderByAdminSchema,
  createUserRouteSchema,
  verifyUserRouteSchema,
} from './users.routes.schemas.js';
import usersRepository from './users.repository.js';
import nodemailerService from '../../services/nodemailer.js';
import { endpoint } from '../../config/endpoints.js';
// import { authenticateUser, isAdministrator } from '../auth/auth.middlewares.js';

const usersRouter = express.Router();

// Este ruta "post" y "patch" es para crear usuarios normales (clientes), cambiar de lugar luego a otra carpeta para solo los clientes? No está del todo revisado pq solo copie y pegué del otro proyecto
usersRouter.post('/', async (req, res) => {
  const body = createUserRouteSchema.body.parse(req.body);
  const passwordHash = await bcrypt.hash(body.password, 10);
  const role = 'client';
  const newUser = await usersRepository.addOne({ email: body.email, passwordHash, role });
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1m' },
  );
  await nodemailerService.sendMail({
    from: process.env.EMAIL_USER,
    to: body.email,
    subject: 'Verifica tu correo',
    html: `<a href= "${endpoint}/verify/${token}">Verifica tu correo</a>`,
  });
  res.sendStatus(200);
});

usersRouter.patch('/verify', async (req, res) => {
  const body = verifyUserRouteSchema.body.parse(req.body);
  const decodedToken = jwt.verify(body.token, process.env.REFRESH_TOKEN_SECRET);
  await usersRepository.verifyOne({ id: decodedToken.id });
  res.status(200).json({ message: 'Su correo ha sido verificado exitosamente' });
});

usersRouter.get('/repartidor', async (req, res) => {
  const riders = await usersRepository.getAll({ role: 'repartidor' });
  res.status(200).json(riders);
});

usersRouter.post('/repartidor', async (req, res) => {
  const body = createRiderByAdminSchema.body.parse(req.body);
  const passwordHash = await bcrypt.hash(body.password, 10);
  const newUser = await usersRepository.addOne({
    email: body.email,
    passwordHash,
    role: 'repartidor',
  });
  res.status(201).json(newUser);
});

usersRouter.put('/repartidor/:id', async (req, res) => {
  const { id } = req.params;
  // Solo permitimos actualizar el email por ahora
  const { email } = req.body;
  try {
    const updatedRider = await usersRepository.updateOneById(id, { email });
    res.status(200).json(updatedRider);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

usersRouter.delete('/repartidor/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRider = await usersRepository.deleteOneById({ usersId: id });
    res.status(200).json(deletedRider);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

export default usersRouter;
