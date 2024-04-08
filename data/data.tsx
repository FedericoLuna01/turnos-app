import { UserSettings } from "@/types/types";

export const userSettings: UserSettings = {
  disabledDates: [],
  timeGap: 30,
  availableDays: {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  },
  availableHours: {
    monday: [{ start: "09:00", end: "13:00" }],
    tuesday: [
      { start: "09:00", end: "13:00" },
      { start: "15:00", end: "18:00" },
    ],
    wednesday: [
      { start: "09:00", end: "13:00" },
      { start: "15:00", end: "18:00" },
    ],
    thursday: [
      { start: "09:00", end: "13:00" },
      { start: "15:00", end: "18:00" },
    ],
    friday: [
      { start: "09:00", end: "13:00" },
      { start: "15:00", end: "18:00" },
    ],
    saturday: [],
    sunday: [],
  },
};

export const NavbarLinks = [
  {
    label: "Sacar turno",
    href: "/",
  },
  {
    label: "Lista de turnos",
    href: "/turnos",
  },
  {
    label: "Calendario",
    href: "/calendario",
  },
];
