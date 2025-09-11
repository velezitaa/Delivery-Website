import { z } from 'zod/v4';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
const userIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un número');

// Este primer y segundo esquema es para crear usuarios normales y verificarlos (clientes), cambiar de lugar luego a otra carpeta para solo los clientes? No está del todo revisado pq solo copie y pegué del otro proyecto. Lo de abajo ya si es de este proyecto.
export const createUserRouteSchema = {
  params: z.object({}),
  body: z.object({
    email: z.email('Tiene que ser un email válido'),
    password: z
      .string()
      .regex(
        PASSWORD_REGEX,
        'Debe tener al menos 6 caracteres e incluir una letra, un número y un carácter especial',
      ),
  }),
  queries: z.object({}),
};

export const verifyUserRouteSchema = {
  params: z.object({}),
  body: z.object({
    token: z.jwt('Tiene que ser un token valido'),
  }),
  queries: z.object({}),
};

export const createRiderByAdminSchema = {
  params: z.object({}),
  body: z.object({
    email: z.email('Tiene que ser un email válido'),
    password: z
      .string()
      .regex(
        PASSWORD_REGEX,
        'Debe tener al menos 6 caracteres e incluir una letra, un número y un carácter especial',
      ),
    role: z.literal('repartidor'),
  }),
  queries: z.object({}),
};

export const updateRiderByAdminSchema = {
  params: z.object({ id: userIdSchema }),
  body: z.object({
    email: z.email('Tiene que ser un email válido'),
  }),
  queries: z.object({}),
};

export const deleteRiderByAdminSchema = {
  params: z.object({ id: userIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};
