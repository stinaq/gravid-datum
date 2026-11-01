import { describe, expect, it } from 'vitest';
import { TEXTS } from '../constants';
import type { RangeTable, SingleTable } from '../referenceData/types';
import { buildValueView } from './valueView';

const weight: SingleTable = {
  kind: 'single',
  label: 'fostrets vikt',
  unit: 'g',
  entries: [{ week: 30, value: 1250 }],
};

const sf: RangeTable = {
  kind: 'range',
  label: 'symfys - fundusmått',
  unit: 'cm',
  entries: [{ week: 25, value: { min: 23, max: 27 } }],
};

const plain = (s: string) => s.replace(/\s/g, ' ');

describe('buildValueView', () => {
  it('formats a single value with unit and source age', () => {
    const view = buildValueView(weight, 30 * 7 + 4);
    expect(view.label).toBe('fostrets vikt');
    expect(plain(view.value)).toBe('1 250 g');
    expect(view.note).toBe('värden för 30+0');
    expect(view.hasData).toBe(true);
  });

  it('formats a range', () => {
    expect(buildValueView(sf, 25 * 7).value).toBe('23–27 cm');
  });

  it('shows no data outside the table', () => {
    expect(buildValueView(sf, 24 * 7)).toEqual({ label: 'symfys - fundusmått', value: TEXTS.noData, note: '', hasData: false });
    expect(buildValueView(weight, 31 * 7).value).toBe(TEXTS.noData);
  });
});
