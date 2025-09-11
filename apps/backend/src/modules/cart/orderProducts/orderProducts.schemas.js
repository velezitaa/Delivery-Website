import { z } from 'zod';

export const orderProductSchema = z.object({
  id: z.number(),
  orderId: z.number().int().positive('El ID de la orden debe ser un número entero positivo.'),
  productId: z.number().int().positive('El ID del producto debe ser un número entero positivo.'),
  quantity: z.number().int().positive('La cantidad debe ser un número entero positivo.'),
});
