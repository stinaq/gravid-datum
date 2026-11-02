import { addDays, addYears, startOfMonth } from 'date-fns';
import {
  DAYS_PER_WEEK,
  PICKER_YEARS_BACK,
  PICKER_YEARS_FORWARD,
  SWIPE_THRESHOLD_PX,
  SWIPE_VELOCITY_PX_PER_S,
  WHEEL_REACH,
} from '../constants';
import { daysSinceLmp, isWithinRange } from './gestationalAge';
import type { SpinDirection } from './types';

/** Moves the date one week in the given direction, or keeps it if that leaves the range. */
export const spinDate = (lmp: Date, date: Date, direction: SpinDirection): Date => {
  const target = addDays(date, direction * DAYS_PER_WEEK);
  return isWithinRange(daysSinceLmp(lmp, target)) ? target : date;
};

/**
 * Swiping left (finger moves left) shows the next week. Spins when the drag is long enough, or
 * when it is a quick flick in the same direction.
 */
export const swipeDirection = (offsetX: number, velocityX: number): SpinDirection => {
  const far = Math.abs(offsetX) >= SWIPE_THRESHOLD_PX;
  const flick = Math.abs(velocityX) >= SWIPE_VELOCITY_PX_PER_S && Math.sign(velocityX) === Math.sign(offsetX);
  if (offsetX === 0 || (!far && !flick)) return 0;
  return offsetX < 0 ? 1 : -1;
};

/** Only the direct neighbours are tappable. The outer columns are off-screen. */
export const columnSpin = (offset: number): SpinDirection => {
  if (offset === 1 || offset === -1) return offset;
  return 0;
};

/** Grid column (1-based) for a week at the given offset from the current one. */
export const columnSlot = (offset: number): number => offset + WHEEL_REACH + 1;

export const pickerBounds = (today: Date): { startMonth: Date; endMonth: Date } => ({
  startMonth: startOfMonth(addYears(today, -PICKER_YEARS_BACK)),
  endMonth: startOfMonth(addYears(today, PICKER_YEARS_FORWARD)),
});
