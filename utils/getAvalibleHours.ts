import { format } from 'date-fns'

import { type Appointment } from '@prisma/client';
import { type UserSettings } from "@/types/types";
import { getTimes } from "./getTimes";

export const getAvalibleHours = (userSettings: UserSettings, date: Date, appointments: Appointment[]) => {
  const day = format(date, 'EEEE')

  const todayAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date)
    return format(appointmentDate, 'dd/MM/yyyy') === format(date, 'dd/MM/yyyy')
  })
  console.log(todayAppointments)

  const times = getTimes(userSettings.timeGap)
  const avalibleIntervals = userSettings.avalibleHours[day.toLowerCase() as keyof typeof userSettings.avalibleHours]

  const avalibleHours = times.filter(time => {
    return avalibleIntervals.some(interval => {
      const start = parseInt(interval.start.replace(":", ""))
      const end = parseInt(interval.end.replace(":", ""))
      const timeInt = parseInt(time.replace(":", ""))
      return timeInt >= start && timeInt <= end
    })
  })

  const avalibleHoursWithAppointments = avalibleHours.filter(hour => {
    return !todayAppointments.some(appointment => {
      const appointmentDate = new Date(appointment.date)
      const appointmentHour = format(appointmentDate, 'HH:mm')
      return appointmentHour === hour
    })
  })

  return avalibleHoursWithAppointments
}