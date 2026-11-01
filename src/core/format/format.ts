import { format } from 'date-fns';
import { DATE_FORMAT, LOCALE } from '../constants';

const numberFormat = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 });

export const formatNumber = (value: number): string => numberFormat.format(value);

export const formatDate = (date: Date): string => format(date, DATE_FORMAT);

/** `12+3` for 12 complete weeks and 3 days. */
export const formatWeeksAndDays = (weeks: number, days: number): string => `${weeks}+${days}`;

export const formatWithUnit = (value: string, unit: string): string => `${value} ${unit}`;

export const formatRange = (min: number, max: number): string =>
  `${formatNumber(min)}–${formatNumber(max)}`;
