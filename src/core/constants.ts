export const LOCALE = 'sv-SE';
export const DATE_FORMAT = 'yyyy-MM-dd';

export const DAYS_PER_WEEK = 7;
export const DAYS_TO_DUE_DATE = 280;
/** Last allowed gestational age is MAX_COMPLETE_WEEKS + 6 days. */
export const MAX_COMPLETE_WEEKS = 42;

/** Years before/after today that the date pickers can navigate to. */
export const PICKER_YEARS_BACK = 2;
export const PICKER_YEARS_FORWARD = 2;

/** Minimum horizontal swipe distance (px) that spins the wheel. */
export const SWIPE_THRESHOLD_PX = 40;

export const TEXTS = {
  appTitle: 'Graviditetsreferens',
  lmpLabel: 'Senaste mens',
  dateLabel: 'Datum',
  pickDate: 'Välj datum',
  dueDateLabel: 'Beräknat förlossningsdatum (BF)',
  gestationalAgeLabel: 'Graviditetslängd',
  daysLabel: 'Dagar sedan senaste mens',
  noData: 'Ingen data',
  valuesFor: 'värden för',
  previousWeek: 'Föregående vecka',
  nextWeek: 'Nästa vecka',
  errorBeforeLmp: 'Datumet är före senaste mens',
  errorOutOfRange: `Utanför intervallet (max ${MAX_COMPLETE_WEEKS}+${DAYS_PER_WEEK - 1})`,
} as const;
