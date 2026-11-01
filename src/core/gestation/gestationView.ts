import { DAYS_PER_WEEK } from '../constants';
import { formatDate, formatNumber, formatWeeksAndDays } from '../format/format';
import type { ReferenceTable } from '../referenceData/types';
import { calculateDueDate, isWithinRange, toGestationalAge } from './gestationalAge';
import type { GestationView, WeekColumnView } from './types';
import { validateDates } from './validateDates';
import { buildValueView } from './valueView';

const buildColumn = (totalDays: number, tables: ReferenceTable[]): WeekColumnView => {
  const age = toGestationalAge(totalDays);
  return {
    heading: formatWeeksAndDays(age.weeks, age.days),
    values: tables.map((table) => buildValueView(table, totalDays)),
  };
};

const buildNeighbour = (totalDays: number, tables: ReferenceTable[]): WeekColumnView | undefined =>
  isWithinRange(totalDays) ? buildColumn(totalDays, tables) : undefined;

export const buildGestationView = (
  lmp: Date | undefined,
  date: Date,
  tables: ReferenceTable[],
): GestationView => {
  if (!lmp) return {};

  const dueDate = formatDate(calculateDueDate(lmp));
  const validation = validateDates(lmp, date);
  if (!validation.ok) return { dueDate, error: validation.error };

  const { totalDays } = validation.age;
  return {
    dueDate,
    wheel: {
      daysText: formatNumber(totalDays),
      previous: buildNeighbour(totalDays - DAYS_PER_WEEK, tables),
      current: buildColumn(totalDays, tables),
      next: buildNeighbour(totalDays + DAYS_PER_WEEK, tables),
    },
  };
};
