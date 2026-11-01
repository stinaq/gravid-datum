import { addDays, addYears, startOfMonth } from 'date-fns';
import { DAYS_PER_WEEK, PICKER_YEARS_BACK, PICKER_YEARS_FORWARD, SWIPE_THRESHOLD_PX } from '../constants';
import { daysSinceLmp, isWithinRange } from './gestationalAge';
import type { SpinDirection } from './types';

/** Moves the date one week in the given direction, or keeps it if that leaves the range. */
export const spinDate = (lmp: Date, date: Date, direction: SpinDirection): Date => {
  const target = addDays(date, direction * DAYS_PER_WEEK);
  return isWithinRange(daysSinceLmp(lmp, target)) ? target : date;
};

/** Swiping left (finger moves left) shows the next week. */
export const swipeDirection = (startX: number, endX: number): SpinDirection => {
  const delta = endX - startX;
  if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return 0;
  return delta < 0 ? 1 : -1;
};

export type SpinAnimation = 'none' | 'fromLeft' | 'fromRight';

export const spinAnimation = (direction: SpinDirection): SpinAnimation => {
  if (direction === 1) return 'fromRight';
  if (direction === -1) return 'fromLeft';
  return 'none';
};

export const pickerBounds = (today: Date): { startMonth: Date; endMonth: Date } => ({
  startMonth: startOfMonth(addYears(today, -PICKER_YEARS_BACK)),
  endMonth: startOfMonth(addYears(today, PICKER_YEARS_FORWARD)),
});
