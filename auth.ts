import NextAuth from "next-auth";

import { getUserById } from "./utils/user";
import authConfig from "./auth.config";
import { UserRole } from "@prisma/client";
import prismadb from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";

declare module "next-auth" {
  interface User {
    role: UserRole;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  // TODO: Cambiar secret por una variable de entorno
  secret: process.env.AUTH_SECRET || "default-secret",
  events: {
    async linkAccount({ user }) {
      await prismadb.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // TODO: Agregar posibilidad para bloquear usuarios
      if (account?.provider !== "credentials") return true;

      if (user.id) {
        const existingUser = await getUserById(user.id);
        // Si el usuario no existe o no ha verificado su correo, no permitir el inicio de sesión
        // TODO: Agregar verificación de correo
        // if (!existingUser?.emailVerified) return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prismadb) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
