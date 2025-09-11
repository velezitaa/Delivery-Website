import { z } from 'zod/v4';
import { orderSchema } from './order.schemas.js';

const orderIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un número');

const userIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un número');

export const createOrderRouteSchema = {
  params: z.object({}),
  body: orderSchema.omit({ id: true }),
  queries: z.object({}),
};

export const deleteOrderRouteSchema = {
  params: z.object({
    orderId: orderIdSchema,
    userId: userIdSchema,
  }),
  body: z.object({}),
  queries: z.object({}),
};

// export const updateOrderRouteSchema = {
//   params: z.object({
//     orderId: orderIdSchema,
//     userId: userIdSchema,
//   }),
//   body: z.object({
//     status: z.enum(['preparacion', 'preparado', 'camino', 'recibido']),
//   }),
//   queries: z.object({}),
// };
