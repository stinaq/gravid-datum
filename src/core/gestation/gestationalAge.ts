import { addDays, differenceInCalendarDays } from 'date-fns';
import { DAYS_PER_WEEK, DAYS_TO_DUE_DATE, MAX_COMPLETE_WEEKS } from '../constants';
import type { GestationalAge } from './types';

/** Complete calendar days from LMP to date. The LMP day itself is day 0. */
export const daysSinceLmp = (lmp: Date, date: Date): number => differenceInCalendarDays(date, lmp);

export const toGestationalAge = (totalDays: number): GestationalAge => ({
  totalDays,
  weeks: Math.floor(totalDays / DAYS_PER_WEEK),
  days: totalDays % DAYS_PER_WEEK,
});

export const calculateDueDate = (lmp: Date): Date => addDays(lmp, DAYS_TO_DUE_DATE);

/** Last allowed day, i.e. MAX_COMPLETE_WEEKS + 6 days. */
export const MAX_TOTAL_DAYS = (MAX_COMPLETE_WEEKS + 1) * DAYS_PER_WEEK - 1;

export const isWithinRange = (totalDays: number): boolean =>
  totalDays >= 0 && totalDays <= MAX_TOTAL_DAYS;
