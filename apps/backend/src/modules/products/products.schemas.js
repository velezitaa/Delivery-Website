import { z } from 'zod/v4';

// const PRICE_REGEX = /^\d{1,3}(?:\.\d{3})*(?:,\d+)?$/;

export const productSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'El nombre del producto no puede estar vacío.'),
  price: z
    .number()
    .int()
    .positive('El precio debe ser un número entero positivo.')
    .min(1, 'El precio debe ser mayor a cero.'),
});
