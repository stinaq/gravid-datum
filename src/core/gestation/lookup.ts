import { DAYS_PER_WEEK } from '../constants';
import type { ReferenceEntry } from '../referenceData/types';

export const entryStartDay = (entry: ReferenceEntry<unknown>): number =>
  entry.week * DAYS_PER_WEEK + (entry.day ?? 0);

/**
 * The latest entry starting at or before totalDays. It covers until the next entry starts
 * or its own week ends, whichever comes first. No interpolation, no filling of gaps.
 * Entries must be sorted (see validateTable).
 */
export const findEntry = <V>(
  entries: ReferenceEntry<V>[],
  totalDays: number,
): ReferenceEntry<V> | undefined => {
  const index = entries.findLastIndex((entry) => entryStartDay(entry) <= totalDays);
  if (index === -1) return undefined;

  const entry = entries[index];
  const next = entries[index + 1];
  const endOfWeek = (entry.week + 1) * DAYS_PER_WEEK;
  const end = next ? Math.min(entryStartDay(next), endOfWeek) : endOfWeek;
  return totalDays < end ? entry : undefined;
};
