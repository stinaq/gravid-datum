export type GestationalAge = {
  totalDays: number;
  weeks: number;
  days: number;
};

export type DateValidation =
  | { ok: true; age: GestationalAge }
  | { ok: false; error: string };

export type ValueView = {
  label: string;
  value: string;
  /** e.g. `värden för 12+0`. Empty when there is no data. */
  note: string;
  hasData: boolean;
};

export type WeekColumnView = {
  heading: string;
  values: ValueView[];
};

export type WheelView = {
  daysText: string;
  previous?: WeekColumnView;
  current: WeekColumnView;
  next?: WeekColumnView;
};

export type GestationView = {
  dueDate?: string;
  error?: string;
  wheel?: WheelView;
};

export type SpinDirection = -1 | 0 | 1;
