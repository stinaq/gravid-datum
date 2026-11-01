import { describe, expect, it } from 'vitest';
import { formatDate, formatNumber, formatRange, formatWeeksAndDays, formatWithUnit } from './format';

// Swedish grouping uses a non-breaking space; normalise for readable assertions.
const plain = (s: string) => s.replace(/\s/g, ' ');

describe('format', () => {
  it('formats numbers the Swedish way, without decimals', () => {
    expect(plain(formatNumber(1250))).toBe('1 250');
    expect(formatNumber(42)).toBe('42');
    expect(formatNumber(4.6)).toBe('5');
  });

  it('formats dates as YYYY-MM-DD', () => {
    expect(formatDate(new Date(2026, 0, 5))).toBe('2026-01-05');
  });

  it('formats weeks and days', () => {
    expect(formatWeeksAndDays(12, 3)).toBe('12+3');
    expect(formatWeeksAndDays(0, 0)).toBe('0+0');
  });

  it('formats ranges and units', () => {
    expect(formatRange(23, 27)).toBe('23–27');
    expect(formatWithUnit('23–27', 'cm')).toBe('23–27 cm');
  });
});
