export interface UserSettings {
  disabledDates: Date[],
  timeGap: number,
  avalibleDays: DaysOfWeek,
  avalibleHours: AvalibleHours
}

export interface DaysOfWeek {
  monday: boolean,
  tuesday: boolean,
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean,
  sunday: boolean,
}

export interface AvalibleHours {
  monday: Hour[],
  tuesday: Hour[],
  wednesday: Hour[],
  thursday: Hour[],
  friday: Hour[],
  saturday: Hour[],
  sunday: Hour[],
}

export interface Hour {
  start: string,
  end: string,
}