import { format } from "date-fns";

import prismadb from "@/lib/db";
import Link from "next/link";
import { auth } from "@/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AppointmentsPage = async () => {
  const session = await auth()

  if (!session) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>
          Debes iniciar sesión para ver tus turnos
        </p>
      </div>
    )
  }

  const appointments = await prismadb.appointment.findMany({
    where: {
      userId: session?.user?.id
    },
    orderBy: { date: "asc" },
    include: {
      professional: {
        select: {
          name: true,
        }
      },
    }
  });

  return (
    <div className="flex items-center justify-center h-full">
      <div>
        {
          appointments.length === 0 && (
            <div className="flex items-center justify-center flex-col">
              <h2>
                No tienes turnos agendados
              </h2>
              <Button
                asChild
              >
                <Link href="/buscar-turno">
                  Buscar turno
                </Link>
              </Button>
            </div>
          )
        }
        {
          appointments && appointments.map(({ id, date, name, professional }) => (
            <Card
              key={id}
            >
              <CardHeader>
                <CardTitle>
                  Turno con: {professional.name}
                </CardTitle>
                <CardDescription>
                  {format(date, "dd/MM/yyyy, HH:mm")} - {name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                >
                  <Link href={`/turnos/${id}`}>
                    Ver mi turno
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default AppointmentsPage;
