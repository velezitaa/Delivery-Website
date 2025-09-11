import { z } from 'zod/v4';

export const orderSchema = z.object({
  id: z.number(),
  date: z.string().datetime(),
  status: z.enum(['preparacion', 'preparado', 'camino', 'recibido']).optional(),
  payment_method_id: z
    .number()
    .int()
    .positive('El ID del método de pago debe ser un número entero positivo.'),
  user_id: z.number().int().positive('El ID del usuario debe ser un número entero positivo.'),
});
