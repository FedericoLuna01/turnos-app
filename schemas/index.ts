import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(2, { message: "Mínimo 8 caracteres" }),
  confirmPassword: z.string().min(2, { message: "Mínimo 2 caracteres" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(2, { message: "Mínimo 8 caracteres" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(2, { message: "Mínimo 2 caracteres" }),
  name: z.string().min(1, { message: "Nombre es requerido" }),
});
