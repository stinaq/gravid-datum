import { describe, expect, it } from 'vitest';
import {
  MAX_TOTAL_DAYS,
  calculateDueDate,
  daysSinceLmp,
  isWithinRange,
  toGestationalAge,
} from './gestationalAge';

describe('daysSinceLmp', () => {
  it('is 0 on the LMP day', () => {
    expect(daysSinceLmp(new Date(2026, 4, 10), new Date(2026, 4, 10))).toBe(0);
  });

  it('ignores time of day', () => {
    expect(daysSinceLmp(new Date(2026, 4, 10, 23, 59), new Date(2026, 4, 11, 0, 1))).toBe(1);
    expect(daysSinceLmp(new Date(2026, 4, 10, 0, 1), new Date(2026, 4, 10, 23, 59))).toBe(0);
  });

  it('counts across DST changes', () => {
    expect(daysSinceLmp(new Date(2026, 2, 28), new Date(2026, 2, 30))).toBe(2);
    expect(daysSinceLmp(new Date(2026, 9, 24), new Date(2026, 9, 26))).toBe(2);
  });

  it('counts across a year boundary', () => {
    expect(daysSinceLmp(new Date(2025, 11, 30), new Date(2026, 0, 2))).toBe(3);
  });

  it('is negative before LMP', () => {
    expect(daysSinceLmp(new Date(2026, 4, 10), new Date(2026, 4, 9))).toBe(-1);
  });
});

describe('toGestationalAge', () => {
  it('splits into complete weeks and days', () => {
    expect(toGestationalAge(0)).toEqual({ totalDays: 0, weeks: 0, days: 0 });
    expect(toGestationalAge(6)).toEqual({ totalDays: 6, weeks: 0, days: 6 });
    expect(toGestationalAge(7)).toEqual({ totalDays: 7, weeks: 1, days: 0 });
    expect(toGestationalAge(87)).toEqual({ totalDays: 87, weeks: 12, days: 3 });
  });
});

describe('calculateDueDate', () => {
  it('is LMP + 280 days', () => {
    expect(calculateDueDate(new Date(2026, 0, 1))).toEqual(new Date(2026, 9, 8));
  });
});

describe('isWithinRange', () => {
  it('allows 0+0 to 42+6', () => {
    expect(MAX_TOTAL_DAYS).toBe(42 * 7 + 6);
    expect(isWithinRange(0)).toBe(true);
    expect(isWithinRange(MAX_TOTAL_DAYS)).toBe(true);
  });

  it('rejects before LMP and from 43+0', () => {
    expect(isWithinRange(-1)).toBe(false);
    expect(isWithinRange(43 * 7)).toBe(false);
  });
});
