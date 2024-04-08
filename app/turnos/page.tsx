import { format } from "date-fns";

import prismadb from "@/lib/db";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

const AppointmentsPage = async () => {
  const appointments = await prismadb.appointment.findMany({
    orderBy: { date: "asc" },
  });
  return (
    <div className="flex items-center justify-center h-full">
      <div>
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border border-border p-4 m-2 rounded-md"
          >
            {appointment.id} - {format(appointment.date, "dd/MM/yyyy, HH:mm")} -{" "}
            {appointment.name}
            <Link href={`/turnos/${appointment.id}`}>
              <LinkIcon />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsPage;
