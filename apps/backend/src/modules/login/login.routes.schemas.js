import { z } from 'zod/v4';

export const loginUserRouteSchema = {
  params: z.object({}),
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
  queries: z.object({}),
};
