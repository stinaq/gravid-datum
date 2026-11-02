import { describe, expect, it } from 'vitest';
import { TEXTS } from '../constants';
import type { WeekColumnView } from './types';
import { buildWheelColumns } from './wheelColumns';

const column = (offset: number, heading: string): WeekColumnView => ({
  key: heading,
  offset,
  heading,
  values: [],
});

describe('buildWheelColumns', () => {
  const columns = buildWheelColumns(
    [column(-2, '10+3'), column(-1, '11+3'), column(0, '12+3'), column(1, '13+3'), column(2, '14+3')],
    '87',
  );

  it('places weeks in grid slots 1..5 and marks the current one as main', () => {
    expect(columns.map((c) => [c.slot, c.variant])).toEqual([
      [1, 'side'],
      [2, 'side'],
      [3, 'main'],
      [4, 'side'],
      [5, 'side'],
    ]);
  });

  it('only the direct neighbours are tappable', () => {
    expect(columns.map((c) => c.spin)).toEqual([0, -1, 0, 1, 0]);
  });

  it('marks the outermost columns as off-screen', () => {
    expect(columns.map((c) => c.offscreen)).toEqual([true, false, false, false, true]);
  });

  it('labels neighbours as previous or next week', () => {
    expect(columns[1].ariaLabel).toBe(`${TEXTS.previousWeek} 11+3`);
    expect(columns[3].ariaLabel).toBe(`${TEXTS.nextWeek} 13+3`);
  });

  it('gives every column the days text, so it is ready when it becomes current', () => {
    expect(columns.every((c) => c.subheading === '87')).toBe(true);
  });
});
