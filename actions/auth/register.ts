"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import prismadb from "@/lib/db";
import { getUserByEmail } from "@/utils/user";
// import { generateVerificationToken } from "@/lib/tokens";
// import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Error en los campos" };
  }

  const { password, email, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Correo en uso" };
  }

  await prismadb.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // TODO: Uncomment this when email verification is implemented
  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(
  //   verificationToken.email,
  //   name,
  //   verificationToken.token
  // );

  // return { success: "Correo de confirmación enviado" };
  return { success: "Cuenta creada correctamente" };
};
