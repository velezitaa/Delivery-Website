import { z } from 'zod/v4';
// import { orderSchema } from './order.schemas.js';

const PAYMENT_REFERENCE_REGEX = /^\d{4}$/;

const orderIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un número');

const userIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un número');

// export const createOrderRouteSchema = {
//   params: z.object({}),
//   body: orderSchema.omit({ id: true }),
//   queries: z.object({}),
// };

export const createOrderRouteSchema = {
  body: z.object({
    payment_method_id: z.number().int().positive('El ID del método de pago es requerido.'),
    payment_reference: z
      .string()
      .regex(PAYMENT_REFERENCE_REGEX, 'La referencia debe tener 4 caracteres.'),
    monto: z.number().positive('El monto debe ser un número positivo.'),
    user_id: z.number().int().positive('El ID del usuario es requerido.'),
  }),
};

export const userOrdersRouteSchema = {
  params: z.object({
    userId: userIdSchema,
  }),
};

export const deleteOrderRouteSchema = {
  params: z.object({
    orderId: orderIdSchema,
    userId: userIdSchema,
  }),
  body: z.object({}),
  queries: z.object({}),
};

export const updatePaymentStatusRouteSchema = {
  params: z.object({
    orderId: orderIdSchema,
  }),
  body: z.object({
    payment_status: z.enum(['aceptado', 'rechazado']),
  }),
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
