import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Bell, CreditCard, Lock, User } from "lucide-react"

export default function ConfigPage() {
  return (
    <div className="flex w-full h-full container items-start justify-center">
      <aside className="hidden w-64 border-r bg-background  pt-6 md:flex h-full">
        {/* TODO: Arreglar width de los botones (hacerlos w-full) */}
        <div
          className="sticky top-10 h-fit"
        >
          <div className="mb-6 text-lg font-semibold">Configuración</div>
          <nav className="space-y-1">
            <Link
              href="#perfil"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <User className="size-5" />
              Perfil
            </Link>
            <Link
              href="#seguridad"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <Lock className="size-5" />
              Seguridad
            </Link>
            <Link
              href="#notificaciones"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <Bell className="size-5" />
              Notificaciones
            </Link>
            <Link
              href="#pagos"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <CreditCard className="size-5" />
              Pagos
            </Link>
          </nav>
        </div>
      </aside>
      <div className="flex-1 p-6 md:p-10 bg-muted/40">
        <div id="perfil" className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Perfil</h1>
            <p className="text-muted-foreground">Administra la información y configuración de tu cuenta. </p>
          </div>
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Información personal</CardTitle>
                <CardDescription>Actualiza tu nombre y foto de perfil.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="avatar">Imagen de perfil</Label>
                    <div className="flex items-center mt-2 gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Change</Button>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            <Card
              id="seguridad"
            >
              <CardHeader>
                <CardTitle>Seguridad</CardTitle>
                <CardDescription>Cambia tu contraseña y activa autenticación de dos factores.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Checkbox id="twoFactorAuth" defaultChecked />
                    <Label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</Label>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button>Actualizar Ajustes de Seguridad</Button>
              </CardFooter>
            </Card>
            <Card
              id="notificaciones"
            >
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>Administra tus preferencias de notificaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <Checkbox id="emailNotifications" defaultChecked />
                    <Label htmlFor="emailNotifications">Receive email notifications</Label>
                  </div>
                  <div className="flex items-center gap-4">
                    <Checkbox id="pushNotifications" />
                    <Label htmlFor="pushNotifications">Receive push notifications</Label>
                  </div>
                  <div className="flex items-center gap-4">
                    <Checkbox id="webNotifications" defaultChecked />
                    <Label htmlFor="webNotifications">Receive in-app notifications</Label>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button>Save Notification Settings</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Billing</CardTitle>
                <CardDescription>View your subscription details and update your payment method.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <div className="mb-2 font-medium">Current Plan</div>
                    <div className="flex items-center justify-between">
                      <div>Pro Plan</div>
                      <div>$9.99/month</div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-medium">Payment Method</div>
                    <div className="flex items-center justify-between">
                      <div>Visa ending in 1234</div>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-medium">Billing History</div>
                    <div className="flex items-center justify-between">
                      <div>July 1, 2023</div>
                      <div>$9.99</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>June 1, 2023</div>
                      <div>$9.99</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Billing Information</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
