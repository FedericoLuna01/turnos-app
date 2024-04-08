export interface UserSettings {
  disabledDates: Date[];
  timeGap: number;
  availableDays: DaysOfWeek;
  availableHours: AvailableHours;
}

export interface DaysOfWeek {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface AvailableHours {
  monday: Hour[];
  tuesday: Hour[];
  wednesday: Hour[];
  thursday: Hour[];
  friday: Hour[];
  saturday: Hour[];
  sunday: Hour[];
}

export interface Hour {
  start: string;
  end: string;
}
