import { addDays } from 'date-fns';
import { describe, expect, it } from 'vitest';
import { TEXTS } from '../constants';
import type { SingleTable } from '../referenceData/types';
import { buildGestationView } from './gestationView';

const lmp = new Date(2026, 0, 1);
const crl: SingleTable = {
  kind: 'single',
  label: 'CRL',
  unit: 'mm',
  entries: [
    { week: 11, value: 45 },
    { week: 12, value: 55 },
    { week: 13, value: 70 },
  ],
};

describe('buildGestationView', () => {
  it('is empty without LMP', () => {
    expect(buildGestationView(undefined, lmp, [crl])).toEqual({});
  });

  it('builds the current week with two weeks on each side', () => {
    const view = buildGestationView(lmp, addDays(lmp, 87), [crl]);
    expect(view.dueDate).toBe('2026-10-08');
    expect(view.error).toBeUndefined();
    const wheel = view.wheel;
    expect(wheel?.daysText).toBe('87');
    expect(wheel?.columns.map((c) => [c.offset, c.key, c.heading])).toEqual([
      [-2, '73', '10+3'],
      [-1, '80', '11+3'],
      [0, '87', '12+3'],
      [1, '94', '13+3'],
      [2, '101', '14+3'],
    ]);
    expect(wheel?.columns.map((c) => c.values[0].value)).toEqual([
      TEXTS.noData,
      '45 mm',
      '55 mm',
      '70 mm',
      TEXTS.noData,
    ]);
    expect(wheel?.previousHeading).toBe('11+3');
    expect(wheel?.nextHeading).toBe('13+3');
  });

  it('leaves out weeks outside 0+0 to 42+6', () => {
    const first = buildGestationView(lmp, addDays(lmp, 3), [crl]).wheel;
    expect(first?.columns.map((c) => c.offset)).toEqual([0, 1, 2]);
    expect(first?.previousHeading).toBeUndefined();
    const last = buildGestationView(lmp, addDays(lmp, 42 * 7 + 6), [crl]).wheel;
    expect(last?.columns.map((c) => c.offset)).toEqual([-2, -1, 0]);
    expect(last?.nextHeading).toBeUndefined();
    expect(last?.previousHeading).toBe('41+6');
  });

  it('shows an error but keeps the due date when out of range', () => {
    expect(buildGestationView(lmp, addDays(lmp, -1), [crl])).toEqual({
      dueDate: '2026-10-08',
      error: TEXTS.errorBeforeLmp,
    });
    expect(buildGestationView(lmp, addDays(lmp, 43 * 7), [crl]).error).toBe(TEXTS.errorOutOfRange);
  });
});
