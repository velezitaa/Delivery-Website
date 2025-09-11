import { z } from 'zod/v4';

const PHONE_REGEX = /^[0](412|424|414|426|416|212)[0-9]{7}$/;

export const paymentMethodsSchema = z.object({
  id: z.number(),
  bank: z.string().min(1, 'El nombre del campo no puede estar vacío.'),
  phone: z.string().regex(PHONE_REGEX, 'Tiene que ser un numero venezolano valido'),
  cedula: z.string().min(7, 'La cédula debe tener al menos 7 caracteres').max(8),
});
