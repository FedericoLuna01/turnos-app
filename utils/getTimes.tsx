import { eachMinuteOfInterval, endOfDay, startOfDay, format } from "date-fns";

export function getTimes(interval: number) {
  const today = new Date();
  const startOfToday = startOfDay(today);
  const endOfToday = endOfDay(today);

  const allMinutes = eachMinuteOfInterval({ start: startOfToday, end: endOfToday });
  const halfHourly = allMinutes.filter((date, index) => index % interval === 0);

  const halfHourlyFormatted = halfHourly.map(date => format(date, 'HH:mm'));

  return halfHourlyFormatted;
}