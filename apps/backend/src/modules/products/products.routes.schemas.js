import { z } from 'zod/v4';
import { productSchema } from './products.schemas.js';

const productIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un número');

export const createProductRouteSchema = {
  params: z.object({}),
  body: productSchema.omit({ id: true }),
  queries: z.object({}),
};

export const deleteProductRouteSchema = {
  params: z.object({ id: productIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};

export const updateProductRouteSchema = {
  params: z.object({ id: productIdSchema }),
  body: productSchema.omit({ id: true }),
  queries: z.object({}),
};
