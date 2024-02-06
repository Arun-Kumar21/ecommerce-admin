import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6,{
    message: 'Password must be at least 6 characters long'
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3,{
    message: 'Username must be at least 3 characters long'
  }),
  password: z.string().min(6,{
    message: 'Password must be at least 6 characters long'
  }),
});