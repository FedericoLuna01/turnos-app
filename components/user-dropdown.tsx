import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { User } from "lucide-react"
import { type Session } from "next-auth"
import Link from "next/link"
import { signOut } from "@/auth"

export const UserDropdown = ({ session }: { session: Session | null }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            {
              session?.user?.image && (
                <AvatarImage src={session?.user?.image} alt={`Avatar de el usuario ${session.user.name}`} />
              )
            }
            <AvatarFallback>
              <User className="size-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link
          href='/turnos'
        >
          <DropdownMenuItem>
            Mis turnos
          </DropdownMenuItem>
        </Link>
        <Link
          href='/configuracion'
        >
          <DropdownMenuItem>
            Configuración
          </DropdownMenuItem>
        </Link>
        {
          session?.user?.role === 'PROFESSIONAL' && (
            <Link
              href='/dashboard'
            >
              <DropdownMenuItem>
                Dashboard
              </DropdownMenuItem>
            </Link>
          )
        }
        <DropdownMenuSeparator />
        {/* TODO: Cambiar color a rojo */}
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <DropdownMenuItem>
            <button>
              Cerrar sesión
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}