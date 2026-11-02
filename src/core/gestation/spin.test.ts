import { addDays } from 'date-fns';
import { describe, expect, it } from 'vitest';
import { columnSlot, columnSpin, pickerBounds, spinDate, swipeDirection } from './spin';

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
  it('ignores small, slow movements', () => {
    expect(swipeDirection(20, 50)).toBe(0);
    expect(swipeDirection(-39, -100)).toBe(0);
    expect(swipeDirection(0, 900)).toBe(0);
  });

  it('swipe left shows next week, swipe right previous week', () => {
    expect(swipeDirection(-100, 0)).toBe(1);
    expect(swipeDirection(100, 0)).toBe(-1);
    expect(swipeDirection(40, 0)).toBe(-1);
  });

  it('spins on a short, quick flick', () => {
    expect(swipeDirection(-15, -600)).toBe(1);
    expect(swipeDirection(15, 600)).toBe(-1);
  });

  it('does not spin when the flick goes back the other way', () => {
    expect(swipeDirection(-15, 600)).toBe(0);
  });
});

describe('columnSpin', () => {
  it('only the direct neighbours spin the wheel', () => {
    expect(columnSpin(-1)).toBe(-1);
    expect(columnSpin(1)).toBe(1);
    expect(columnSpin(0)).toBe(0);
    expect(columnSpin(2)).toBe(0);
    expect(columnSpin(-2)).toBe(0);
  });
});

describe('columnSlot', () => {
  it('maps offsets -2..2 to grid columns 1..5', () => {
    expect(columnSlot(-2)).toBe(1);
    expect(columnSlot(0)).toBe(3);
    expect(columnSlot(2)).toBe(5);
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
