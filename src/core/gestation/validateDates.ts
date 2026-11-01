import { TEXTS } from '../constants';
import { daysSinceLmp, isWithinRange, toGestationalAge } from './gestationalAge';
import type { DateValidation } from './types';

export const validateDates = (lmp: Date, date: Date): DateValidation => {
  const totalDays = daysSinceLmp(lmp, date);
  if (totalDays < 0) return { ok: false, error: TEXTS.errorBeforeLmp };
  if (!isWithinRange(totalDays)) return { ok: false, error: TEXTS.errorOutOfRange };
  return { ok: true, age: toGestationalAge(totalDays) };
};
