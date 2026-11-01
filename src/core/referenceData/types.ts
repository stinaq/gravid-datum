// An entry applies from week+day until the next entry starts or its own week ends.
export type ReferenceEntry<V> = {
  week: number;
  day?: number; // 0–6, defaults to 0
  value: V;
};

export type Range = { min: number; max: number };

export type SingleTable = {
  kind: 'single';
  label: string;
  unit: string;
  entries: ReferenceEntry<number>[];
};

export type RangeTable = {
  kind: 'range';
  label: string;
  unit: string;
  entries: ReferenceEntry<Range>[];
};

export type ReferenceTable = SingleTable | RangeTable;
