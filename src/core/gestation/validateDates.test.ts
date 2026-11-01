import { addDays } from 'date-fns';
import { describe, expect, it } from 'vitest';
import { TEXTS } from '../constants';
import { validateDates } from './validateDates';

const lmp = new Date(2026, 0, 1);

describe('validateDates', () => {
  it('returns the gestational age for valid dates', () => {
    expect(validateDates(lmp, addDays(lmp, 87))).toEqual({
      ok: true,
      age: { totalDays: 87, weeks: 12, days: 3 },
    });
  });

  it('accepts the LMP day itself', () => {
    expect(validateDates(lmp, lmp).ok).toBe(true);
  });

  it('rejects a date before LMP', () => {
    expect(validateDates(lmp, addDays(lmp, -1))).toEqual({ ok: false, error: TEXTS.errorBeforeLmp });
  });

  it('accepts 42+6 and rejects 43+0', () => {
    expect(validateDates(lmp, addDays(lmp, 42 * 7 + 6)).ok).toBe(true);
    expect(validateDates(lmp, addDays(lmp, 43 * 7))).toEqual({ ok: false, error: TEXTS.errorOutOfRange });
  });
});
