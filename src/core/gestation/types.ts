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
  /** Stable while spinning, so a week keeps its element as it moves between slots. */
  key: string;
  /** Weeks from the current one, -WHEEL_REACH to WHEEL_REACH. */
  offset: number;
  heading: string;
  values: ValueView[];
};

export type WheelView = {
  daysText: string;
  columns: WeekColumnView[];
  previousHeading?: string;
  nextHeading?: string;
};

export type GestationView = {
  dueDate?: string;
  error?: string;
  wheel?: WheelView;
};

export type SpinDirection = -1 | 0 | 1;
