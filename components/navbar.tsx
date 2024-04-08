import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { NavbarLinks } from "@/data/data";
import SignOutButton from "./signout-button";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex items-center justify-between p-4 container border-b">
      <h1 className="text-3xl font-bold">Turnos app</h1>
      <div className="flex gap-4">
        {NavbarLinks.map((link, index) => (
          <Button asChild key={index} variant="link">
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
        {session ? (
          <SignOutButton />
        ) : (
          <Button variant="secondary">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
