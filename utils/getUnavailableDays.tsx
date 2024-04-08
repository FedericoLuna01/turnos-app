import { eachDayOfInterval, endOfYear, format, startOfYear } from "date-fns";

import { DaysOfWeek } from "@/types/types";

export const getUnavailableDays = (availableDays: DaysOfWeek) => {
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  // Filtrar los días que tienen el valor true
  const availableDates = daysOfWeek.filter(
    (dia) => availableDays[dia as keyof typeof availableDays]
  );

  // Obtener fechas para el próximo año
  const startDate = startOfYear(new Date());
  const endDate = endOfYear(new Date());
  const yearDates = eachDayOfInterval({ start: startDate, end: endDate });

  // Filtrar las fechas según los días disponibles
  const unavailableDates = yearDates.filter(
    (fecha) => !availableDates.includes(format(fecha, "EEEE").toLowerCase())
  );

  return unavailableDates;
};
