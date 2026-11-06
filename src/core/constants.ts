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
/** A quick flick spins the wheel even if it is shorter than the threshold. */
export const SWIPE_VELOCITY_PX_PER_S = 400;
/** Weeks rendered on each side of the current one. The outermost sit just off-screen. */
export const WHEEL_REACH = 2;

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
  infoButtonLabel: 'Om appen',
  infoTitle: 'Om Graviditetsreferens',
  infoIntro:
    'Ett snabbverktyg för barnmorskor och annan vårdpersonal. Utifrån senaste mens och ett valt datum visar appen graviditetslängd och referensvärden för fostret och den gravida vid just den veckan.',
  infoMeasures: 'Referensvärden: symfys-fundusmått, CRL, BPD, fostervikt, bukdiameter och femurlängd.',
  infoClose: 'Stäng',
} as const;
