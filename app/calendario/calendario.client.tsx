"use client";

import {
  Calendar,
  Components,
  dateFnsLocalizer,
  Event,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../calendar.css";

const locales = {
  "es-AR": es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const components: Components = {
  event: (props) => {
    return <div className="w-full">{props.event.title}</div>;
  },
};

const CalendarioClient = ({ appointments }: { appointments: Event[] }) => {
  return (
    <Calendar
      localizer={localizer}
      events={appointments}
      startAccessor="start"
      endAccessor="end"
      views={["month", "week", "day"]}
      components={components}
    />
  );
};

export default CalendarioClient;
