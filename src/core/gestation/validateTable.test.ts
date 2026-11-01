import { describe, expect, it } from 'vitest';
import { referenceTables } from '../referenceData/referenceTables';
import type { RangeTable, SingleTable } from '../referenceData/types';
import { validateTable } from './validateTable';

const single = (entries: SingleTable['entries']): SingleTable => ({
  kind: 'single',
  label: 'x',
  unit: 'mm',
  entries,
});

const range = (entries: RangeTable['entries']): RangeTable => ({
  kind: 'range',
  label: 'x',
  unit: 'cm',
  entries,
});

describe('validateTable', () => {
  it('accepts valid tables', () => {
    expect(validateTable(single([]))).toEqual([]);
    expect(validateTable(single([{ week: 10, value: 5 }, { week: 10, day: 3, value: 6 }, { week: 11, value: 7 }]))).toEqual([]);
    expect(validateTable(range([{ week: 25, value: { min: 23, max: 27 } }]))).toEqual([]);
  });

  it('rejects unsorted and duplicate entries', () => {
    expect(validateTable(single([{ week: 11, value: 1 }, { week: 10, value: 1 }]))).toHaveLength(1);
    expect(validateTable(single([{ week: 10, value: 1 }, { week: 10, day: 0, value: 1 }]))).toHaveLength(1);
  });

  it('rejects ages out of range', () => {
    expect(validateTable(single([{ week: 43, value: 1 }]))).toHaveLength(1);
    expect(validateTable(single([{ week: -1, value: 1 }]))).toHaveLength(1);
    expect(validateTable(single([{ week: 1.5, value: 1 }]))).toHaveLength(1);
    expect(validateTable(single([{ week: 10, day: 7, value: 1 }]))).toHaveLength(1);
  });

  it('rejects non-whole or negative values', () => {
    expect(validateTable(single([{ week: 10, value: 1.5 }]))).toHaveLength(1);
    expect(validateTable(single([{ week: 10, value: -1 }]))).toHaveLength(1);
    expect(validateTable(range([{ week: 10, value: { min: 1.5, max: 2 } }]))).toHaveLength(1);
  });

  it('rejects min > max', () => {
    expect(validateTable(range([{ week: 10, value: { min: 5, max: 4 } }]))).toHaveLength(1);
  });
});

describe('reference data files', () => {
  it.each(referenceTables.map((t) => [t.label, t] as const))('%s is valid', (_, table) => {
    expect(validateTable(table)).toEqual([]);
  });
});
