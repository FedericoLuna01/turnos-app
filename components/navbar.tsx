import { auth } from "@/auth";
import Link from "next/link";

import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { NavbarLinks } from "@/data/data";
import { UserDropdown } from "./user-dropdown";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex items-center justify-between py-4 container border-b">
      <Link
        href='/'
      >
        <h1 className="text-3xl font-bold">Turnos app</h1>
      </Link>
      <div className="flex gap-4 items-center">
        {NavbarLinks.map((link, index) => (
          <Button asChild key={index} variant="link">
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
        {
          session?.user?.role === "PROFESSIONAL" && (
            <Button asChild variant="link">
              <Link href="/dashboard">
                Dashboard
              </Link>
            </Button>
          )
        }
        {session ? (
          <UserDropdown />
        ) : (
          <Button variant="secondary">
            <Link href="/login">Login</Link>
          </Button>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
