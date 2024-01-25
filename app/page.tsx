import { CalendarForm } from "@/components/forms/appointment-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prismadb from "@/lib/db";

export default async function Home() {
  const appointments = await prismadb.appointment.findMany({
    where: {
      date: {
        gt: new Date(),
      },
    }
  })

  return (
    <div
      className="flex items-center justify-center h-full"
    >
      <Card>
        <CardHeader>
          <CardTitle>
            Pedi un turno
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CalendarForm
            appointments={appointments}
          />
        </CardContent>
      </Card>
    </div>
  );
}
