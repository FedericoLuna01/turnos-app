import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turnos app",
  description: "Generated by create next app",
  icons: {
    icon: [
      {
        url: "/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-light.svg",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="es">
        <body
          className={`${inter.className} dark grid grid-rows-[auto,1fr,auto] min-h-screen`}
        >
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
          <footer>
            <div className="container text-center border-t p-4">
              <p>© {new Date().getFullYear()} - Turnos app</p>
            </div>
          </footer>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
