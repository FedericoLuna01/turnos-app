import prismadb from "@/lib/db";
import CalendarioClient from "./calendario.client";
import { getEvents } from "@/actions/getEvents";

const CalendarioPage = async () => {
  const appointments = await prismadb.appointment.findMany({});
  const formattedAppointments = getEvents(appointments);
  return (
    <div className="container h-[80vh] my-10">
      <CalendarioClient appointments={formattedAppointments} />
    </div>
  );
};

export default CalendarioPage;
