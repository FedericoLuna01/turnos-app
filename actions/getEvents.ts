import { userSettings } from "@/data/data";
import { Appointment } from "@prisma/client";
import { addMinutes } from "date-fns";

export const getEvents = (appointments: Appointment[]) => {
  const events = appointments.map((appointment) => {
    const end = addMinutes(appointment.date, userSettings.timeGap)
    return {
      title: appointment.name,
      start: appointment.date,
      end,
      id: appointment.id
    };
  });
  return events;

}