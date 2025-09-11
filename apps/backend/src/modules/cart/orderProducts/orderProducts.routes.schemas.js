import { z } from 'zod';
import { orderProductSchema } from './orderProducts.schemas.js';

const orderIdParamSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El ID de la orden tiene que ser un número.');

const productIdParamSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El ID del producto tiene que ser un número.');

export const addProductToOrderSchema = {
  body: orderProductSchema.omit({
    id: true,
    orderId: true,
  }),
  params: z.object({
    orderId: orderIdParamSchema,
  }),
};

export const updateProductQuantitySchema = {
  body: z.object({
    newQuantity: orderProductSchema.shape.quantity,
  }),
  params: z.object({
    orderId: orderIdParamSchema,
    productId: productIdParamSchema,
  }),
};

export const deleteProductFromOrderSchema = {
  params: z.object({
    orderId: orderIdParamSchema,
    productId: productIdParamSchema,
  }),
};
