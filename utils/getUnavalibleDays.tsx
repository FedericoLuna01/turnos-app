import { eachDayOfInterval, endOfYear, format, startOfYear } from "date-fns";

import { DaysOfWeek } from "@/types/types";

export const getUnavalibleDays = (avalibleDays: DaysOfWeek) => {
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  // Filtrar los días que tienen el valor true
  const avalibleDates = daysOfWeek.filter(dia => avalibleDays[dia as keyof typeof avalibleDays]);

  // Obtener fechas para el próximo año
  const startDate = startOfYear(new Date())
  const endDate = endOfYear(new Date())
  const yearDates = eachDayOfInterval({ start: startDate, end: endDate });

  // Filtrar las fechas según los días disponibles
  const unavalibleDates = yearDates.filter(fecha => !avalibleDates.includes(format(fecha, 'EEEE').toLowerCase()));

  return unavalibleDates;
}
