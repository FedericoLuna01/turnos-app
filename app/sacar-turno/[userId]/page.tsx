import { CalendarForm } from "@/components/forms/appointment-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prismadb from "@/lib/db";

export default async function userAppointmentPage({ params }: { params: { userId: string } }) {
  const appointments = await prismadb.appointment.findMany({
    where: {
      date: {
        gt: new Date(),
      },
      userId: params.userId,
    },
  });

  const professional = await prismadb.user.findUnique({
    where: {
      id: params.userId
    }
  })

  if (!professional) {
    return <div>Profesional no encontrado</div>
  }

  return (
    <div className="flex justify-center items-center flex-col h-full">
      <h1>
        Turno para: {professional.name}
      </h1>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Pide un turno</CardTitle>
          <CardDescription>Pide un turno para tu consulta.</CardDescription>
        </CardHeader>
        <CardContent>
          <CalendarForm appointments={appointments} />
        </CardContent>
      </Card>
    </div>
  );
}