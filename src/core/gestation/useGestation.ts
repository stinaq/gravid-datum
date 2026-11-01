import { useMemo, useRef, useState } from 'react';
import { TEXTS } from '../constants';
import { formatDate } from '../format/format';
import { referenceTables } from '../referenceData/referenceTables';
import { buildGestationView } from './gestationView';
import { pickerBounds, spinAnimation, spinDate, swipeDirection } from './spin';
import type { SpinDirection } from './types';

type OpenPicker = 'lmp' | 'date' | null;

export const useGestation = () => {
  const [today] = useState(() => new Date());
  const [lmp, setLmp] = useState<Date | undefined>(undefined);
  const [date, setDate] = useState<Date>(today);
  const [openPicker, setOpenPicker] = useState<OpenPicker>(null);
  const [lastSpin, setLastSpin] = useState<SpinDirection>(0);
  const swipeStartX = useRef(0);

  const view = useMemo(() => buildGestationView(lmp, date, referenceTables), [lmp, date]);
  const bounds = useMemo(() => pickerBounds(today), [today]);

  const spin = (direction: SpinDirection) => {
    if (!lmp) return;
    setLastSpin(direction);
    setDate(spinDate(lmp, date, direction));
  };

  const toggle = (picker: Exclude<OpenPicker, null>) =>
    setOpenPicker(openPicker === picker ? null : picker);

  return {
    title: TEXTS.appTitle,
    lmp: {
      label: TEXTS.lmpLabel,
      valueText: lmp ? formatDate(lmp) : TEXTS.pickDate,
      selected: lmp,
      isOpen: openPicker === 'lmp',
      onToggle: () => toggle('lmp'),
      onSelect: (selected: Date) => {
        setLmp(selected);
        setLastSpin(0);
        setOpenPicker(null);
      },
      ...bounds,
    },
    date: {
      label: TEXTS.dateLabel,
      valueText: formatDate(date),
      selected: date,
      isOpen: openPicker === 'date',
      onToggle: () => toggle('date'),
      onSelect: (selected: Date) => {
        setDate(selected);
        setLastSpin(0);
        setOpenPicker(null);
      },
      ...bounds,
    },
    dueDate: view.dueDate && { label: TEXTS.dueDateLabel, value: view.dueDate },
    error: view.error,
    wheel: view.wheel && {
      ...view.wheel,
      rowCount: view.wheel.current.values.length + 1,
      ageLabel: TEXTS.gestationalAgeLabel,
      daysLabel: TEXTS.daysLabel,
      previousLabel: TEXTS.previousWeek,
      nextLabel: TEXTS.nextWeek,
      animation: spinAnimation(lastSpin),
      animationKey: formatDate(date),
      onPrevious: () => spin(-1),
      onNext: () => spin(1),
      onSwipeStart: (x: number) => {
        swipeStartX.current = x;
      },
      onSwipeEnd: (x: number) => spin(swipeDirection(swipeStartX.current, x)),
    },
  };
};
