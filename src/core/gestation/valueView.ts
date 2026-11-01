import { TEXTS } from '../constants';
import { formatNumber, formatRange, formatWeeksAndDays, formatWithUnit } from '../format/format';
import type { ReferenceEntry, ReferenceTable } from '../referenceData/types';
import { findEntry } from './lookup';
import type { ValueView } from './types';

const noteFor = (entry: ReferenceEntry<unknown>): string =>
  `${TEXTS.valuesFor} ${formatWeeksAndDays(entry.week, entry.day ?? 0)}`;

const noData = (label: string): ValueView => ({
  label,
  value: TEXTS.noData,
  note: '',
  hasData: false,
});

export const buildValueView = (table: ReferenceTable, totalDays: number): ValueView => {
  if (table.kind === 'range') {
    const entry = findEntry(table.entries, totalDays);
    if (!entry) return noData(table.label);
    return {
      label: table.label,
      value: formatWithUnit(formatRange(entry.value.min, entry.value.max), table.unit),
      note: noteFor(entry),
      hasData: true,
    };
  }
  const entry = findEntry(table.entries, totalDays);
  if (!entry) return noData(table.label);
  return {
    label: table.label,
    value: formatWithUnit(formatNumber(entry.value), table.unit),
    note: noteFor(entry),
    hasData: true,
  };
};
