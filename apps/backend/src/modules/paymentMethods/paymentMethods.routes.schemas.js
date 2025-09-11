import { z } from 'zod/v4';
import { paymentMethodsSchema } from './paymentMethods.schemas.js';

const paymentMethodsIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');

export const createPaymentMethodsRouteSchema = {
  params: z.object({}),
  body: paymentMethodsSchema.omit({ id: true }),
  queries: z.object({}),
};

export const deletePaymentMethodsRouteSchema = {
  params: z.object({ id: paymentMethodsIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};

export const updatePaymentMethodsRouteSchema = {
  params: z.object({ id: paymentMethodsIdSchema }),
  body: paymentMethodsSchema.omit({ id: true }),
  queries: z.object({}),
};
