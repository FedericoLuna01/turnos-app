import { CalendarForm } from "@/components/forms/appointment-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prismadb from "@/lib/db";

export default async function Home() {
  const appointments = await prismadb.appointment.findMany({
    where: {
      date: {
        gt: new Date(),
      },
    },
  });
  return (
    <div>
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
