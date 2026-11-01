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

  it('builds the current week with neighbours', () => {
    const view = buildGestationView(lmp, addDays(lmp, 87), [crl]);
    expect(view.dueDate).toBe('2026-10-08');
    expect(view.error).toBeUndefined();
    expect(view.wheel?.daysText).toBe('87');
    expect(view.wheel?.current.heading).toBe('12+3');
    expect(view.wheel?.current.values[0].value).toBe('55 mm');
    expect(view.wheel?.previous?.heading).toBe('11+3');
    expect(view.wheel?.previous?.values[0].value).toBe('45 mm');
    expect(view.wheel?.next?.heading).toBe('13+3');
    expect(view.wheel?.next?.values[0].value).toBe('70 mm');
  });

  it('has no previous week in week 0 and no next week in week 42', () => {
    expect(buildGestationView(lmp, addDays(lmp, 3), [crl]).wheel?.previous).toBeUndefined();
    const last = buildGestationView(lmp, addDays(lmp, 42 * 7 + 6), [crl]).wheel;
    expect(last?.next).toBeUndefined();
    expect(last?.previous?.heading).toBe('41+6');
  });

  it('shows an error but keeps the due date when out of range', () => {
    expect(buildGestationView(lmp, addDays(lmp, -1), [crl])).toEqual({
      dueDate: '2026-10-08',
      error: TEXTS.errorBeforeLmp,
    });
    expect(buildGestationView(lmp, addDays(lmp, 43 * 7), [crl]).error).toBe(TEXTS.errorOutOfRange);
  });
});
