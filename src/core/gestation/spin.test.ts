import { addDays } from 'date-fns';
import { describe, expect, it } from 'vitest';
import { pickerBounds, spinAnimation, spinDate, swipeDirection } from './spin';

const lmp = new Date(2026, 0, 1);

describe('spinDate', () => {
  it('moves one week forward or back, keeping the +d part', () => {
    const date = addDays(lmp, 87);
    expect(spinDate(lmp, date, 1)).toEqual(addDays(lmp, 94));
    expect(spinDate(lmp, date, -1)).toEqual(addDays(lmp, 80));
    expect(spinDate(lmp, date, 0)).toEqual(date);
  });

  it('does not spin past week 0 or 42+6', () => {
    const early = addDays(lmp, 3);
    expect(spinDate(lmp, early, -1)).toBe(early);
    const late = addDays(lmp, 42 * 7 + 1);
    expect(spinDate(lmp, late, 1)).toBe(late);
  });
});

describe('swipeDirection', () => {
  it('ignores small movements', () => {
    expect(swipeDirection(100, 120)).toBe(0);
    expect(swipeDirection(100, 61)).toBe(0);
  });

  it('swipe left shows next week, swipe right previous week', () => {
    expect(swipeDirection(200, 100)).toBe(1);
    expect(swipeDirection(100, 200)).toBe(-1);
  });
});

describe('spinAnimation', () => {
  it('maps direction to animation', () => {
    expect(spinAnimation(1)).toBe('fromRight');
    expect(spinAnimation(-1)).toBe('fromLeft');
    expect(spinAnimation(0)).toBe('none');
  });
});

describe('pickerBounds', () => {
  it('spans two years back and forward from the start of the month', () => {
    expect(pickerBounds(new Date(2026, 10, 15))).toEqual({
      startMonth: new Date(2024, 10, 1),
      endMonth: new Date(2028, 10, 1),
    });
  });
});
