import { TEXTS } from '../constants';
import { columnSlot, columnSpin } from './spin';
import type { SpinDirection, ValueView, WeekColumnView } from './types';

export type WheelColumnProps = {
  key: string;
  slot: number;
  variant: 'main' | 'side';
  heading: string;
  headingLabel: string;
  subheading: string;
  subheadingLabel: string;
  values: ValueView[];
  /** The outermost columns are clipped, kept only so they can slide in. */
  offscreen: boolean;
  /** Direction a tap on this column spins the wheel. 0 when it is not tappable. */
  spin: SpinDirection;
  ariaLabel: string;
};

/**
 * Every column gets the same props, so a week keeps its content as it moves between slots.
 * The side variant hides what only the current week shows.
 */
export const buildWheelColumns = (columns: WeekColumnView[], daysText: string): WheelColumnProps[] =>
  columns.map((column) => ({
    key: column.key,
    slot: columnSlot(column.offset),
    variant: column.offset === 0 ? 'main' : 'side',
    heading: column.heading,
    headingLabel: TEXTS.gestationalAgeLabel,
    subheading: daysText,
    subheadingLabel: TEXTS.daysLabel,
    values: column.values,
    offscreen: Math.abs(column.offset) > 1,
    spin: columnSpin(column.offset),
    ariaLabel: `${column.offset < 0 ? TEXTS.previousWeek : TEXTS.nextWeek} ${column.heading}`,
  }));
