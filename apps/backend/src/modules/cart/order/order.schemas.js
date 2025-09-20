import { z } from 'zod/v4';

const paymentStatusEnum = z.enum(['pendiente', 'aceptado', 'rechazado']);

export const orderSchema = z.object({
  id: z.number(),
  date: z.string().datetime(),
  status: z.enum(['preparacion', 'preparado', 'camino', 'recibido']).optional(),
  payment_status: paymentStatusEnum.optional().default('pendiente'),
  payment_reference: z.string().optional(),
  monto: z.number().int().positive('El monto debe ser un número entero positivo.'),
  payment_method_id: z
    .number()
    .int()
    .positive('El ID del método de pago debe ser un número entero positivo.'),
  user_id: z.number().int().positive('El ID del usuario debe ser un número entero positivo.'),
});
