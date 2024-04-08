import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "@/auth";

const SignOutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="destructive" className="w-full justify-start">
        <LogOut className="w-4 h-4 mr-2" />
        Cerrar sesión
      </Button>
    </form>
  );
};

export default SignOutButton;
