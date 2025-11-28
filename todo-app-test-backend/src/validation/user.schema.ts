import { email, z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
