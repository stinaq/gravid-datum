import { describe, expect, it } from 'vitest';
import type { ReferenceEntry } from '../referenceData/types';
import { entryStartDay, findEntry } from './lookup';

const weekly: ReferenceEntry<number>[] = [
  { week: 10, value: 100 },
  { week: 11, value: 110 },
  { week: 12, value: 120 },
  // week 13 missing
  { week: 14, value: 140 },
];

const day = (week: number, d: number) => week * 7 + d;

describe('entryStartDay', () => {
  it('defaults day to 0', () => {
    expect(entryStartDay({ week: 12, value: 1 })).toBe(84);
    expect(entryStartDay({ week: 12, day: 3, value: 1 })).toBe(87);
  });
});

describe('findEntry', () => {
  it('uses the week entry for every day of that week', () => {
    expect(findEntry(weekly, day(12, 0))?.value).toBe(120);
    expect(findEntry(weekly, day(12, 6))?.value).toBe(120);
  });

  it('returns nothing before the first entry', () => {
    expect(findEntry(weekly, day(9, 6))).toBeUndefined();
  });

  it('does not fill a missing week from the week before', () => {
    expect(findEntry(weekly, day(13, 0))).toBeUndefined();
    expect(findEntry(weekly, day(13, 6))).toBeUndefined();
  });

  it('returns nothing after the last entry’s week', () => {
    expect(findEntry(weekly, day(14, 6))?.value).toBe(140);
    expect(findEntry(weekly, day(15, 0))).toBeUndefined();
  });

  it('returns nothing for an empty table', () => {
    expect(findEntry([], 0)).toBeUndefined();
  });

  it('supports finer granularity within a week', () => {
    const daily: ReferenceEntry<number>[] = [
      { week: 8, value: 1 },
      { week: 8, day: 3, value: 2 },
      { week: 9, value: 3 },
    ];
    expect(findEntry(daily, day(8, 2))?.value).toBe(1);
    expect(findEntry(daily, day(8, 3))?.value).toBe(2);
    expect(findEntry(daily, day(8, 6))?.value).toBe(2);
    expect(findEntry(daily, day(9, 0))?.value).toBe(3);
  });
});
