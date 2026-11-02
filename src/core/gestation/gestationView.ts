import { DAYS_PER_WEEK, WHEEL_REACH } from '../constants';
import { formatDate, formatNumber, formatWeeksAndDays } from '../format/format';
import type { ReferenceTable } from '../referenceData/types';
import { calculateDueDate, isWithinRange, toGestationalAge } from './gestationalAge';
import type { GestationView, WeekColumnView } from './types';
import { validateDates } from './validateDates';
import { buildValueView } from './valueView';

const headingFor = (totalDays: number): string => {
  const age = toGestationalAge(totalDays);
  return formatWeeksAndDays(age.weeks, age.days);
};

const buildColumn = (totalDays: number, offset: number, tables: ReferenceTable[]): WeekColumnView => ({
  key: String(totalDays),
  offset,
  heading: headingFor(totalDays),
  values: tables.map((table) => buildValueView(table, totalDays)),
});

/** The current week plus up to WHEEL_REACH weeks on each side, left to right, within range. */
const buildColumns = (totalDays: number, tables: ReferenceTable[]): WeekColumnView[] => {
  const columns: WeekColumnView[] = [];
  for (let offset = -WHEEL_REACH; offset <= WHEEL_REACH; offset++) {
    const days = totalDays + offset * DAYS_PER_WEEK;
    if (isWithinRange(days)) columns.push(buildColumn(days, offset, tables));
  }
  return columns;
};

const neighbourHeading = (totalDays: number): string | undefined =>
  isWithinRange(totalDays) ? headingFor(totalDays) : undefined;

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
      columns: buildColumns(totalDays, tables),
      previousHeading: neighbourHeading(totalDays - DAYS_PER_WEEK),
      nextHeading: neighbourHeading(totalDays + DAYS_PER_WEEK),
    },
  };
};
