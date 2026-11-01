import { DAYS_PER_WEEK, MAX_COMPLETE_WEEKS } from '../constants';
import type { ReferenceEntry, ReferenceTable } from '../referenceData/types';
import { entryStartDay } from './lookup';

const isWholeNonNegative = (n: number): boolean => Number.isInteger(n) && n >= 0;

const validateAge = (entry: ReferenceEntry<unknown>): string[] => {
  const errors: string[] = [];
  if (!Number.isInteger(entry.week) || entry.week < 0 || entry.week > MAX_COMPLETE_WEEKS) {
    errors.push(`week ${entry.week} must be a whole number 0–${MAX_COMPLETE_WEEKS}`);
  }
  const day = entry.day ?? 0;
  if (!Number.isInteger(day) || day < 0 || day >= DAYS_PER_WEEK) {
    errors.push(`week ${entry.week}: day ${day} must be a whole number 0–${DAYS_PER_WEEK - 1}`);
  }
  return errors;
};

const validateValues = (table: ReferenceTable): string[] =>
  table.kind === 'single'
    ? table.entries
        .filter((e) => !isWholeNonNegative(e.value))
        .map((e) => `week ${e.week}: value ${e.value} must be a whole number ≥ 0`)
    : table.entries.flatMap((e) => [
        ...(isWholeNonNegative(e.value.min) && isWholeNonNegative(e.value.max)
          ? []
          : [`week ${e.week}: min/max must be whole numbers ≥ 0`]),
        ...(e.value.min <= e.value.max ? [] : [`week ${e.week}: min must be ≤ max`]),
      ]);

const validateOrder = (entries: ReferenceEntry<unknown>[]): string[] =>
  entries.slice(1).flatMap((entry, i) =>
    entryStartDay(entry) > entryStartDay(entries[i])
      ? []
      : [`week ${entry.week}: entries must be sorted with no duplicates`],
  );

/** Returns a list of problems. Empty means the table is valid. */
export const validateTable = (table: ReferenceTable): string[] => [
  ...table.entries.flatMap(validateAge),
  ...validateOrder(table.entries),
  ...validateValues(table),
];
