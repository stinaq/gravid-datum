import { useMemo, useRef, useState } from 'react';
import { TEXTS } from '../constants';
import { formatDate } from '../format/format';
import { referenceTables } from '../referenceData/referenceTables';
import { buildGestationView } from './gestationView';
import { pickerBounds, spinDate, swipeDirection } from './spin';
import type { SpinDirection } from './types';
import { buildWheelColumns } from './wheelColumns';

type OpenPicker = 'lmp' | 'date' | null;

export const useGestation = () => {
  const [today] = useState(() => new Date());
  const [lmp, setLmp] = useState<Date | undefined>(undefined);
  const [date, setDate] = useState<Date>(today);
  const [openPicker, setOpenPicker] = useState<OpenPicker>(null);
  // A drag that ends over a side column must not also count as a tap on it.
  const dragged = useRef(false);

  const view = useMemo(() => buildGestationView(lmp, date, referenceTables), [lmp, date]);
  const bounds = useMemo(() => pickerBounds(today), [today]);

  const spin = (direction: SpinDirection) => {
    if (!lmp) return;
    setDate(spinDate(lmp, date, direction));
  };

  const spinPrevious = () => spin(-1);
  const spinNext = () => spin(1);
  const tapColumn = (direction: SpinDirection) => {
    if (!dragged.current) spin(direction);
  };

  const toggle = (picker: Exclude<OpenPicker, null>) =>
    setOpenPicker(openPicker === picker ? null : picker);

  return {
    title: TEXTS.appTitle,
    info: {
      buttonLabel: TEXTS.infoButtonLabel,
      title: TEXTS.infoTitle,
      intro: TEXTS.infoIntro,
      measures: TEXTS.infoMeasures,
      closeLabel: TEXTS.infoClose,
    },
    lmp: {
      label: TEXTS.lmpLabel,
      valueText: lmp ? formatDate(lmp) : TEXTS.pickDate,
      selected: lmp,
      isOpen: openPicker === 'lmp',
      onToggle: () => toggle('lmp'),
      onSelect: (selected: Date) => {
        setLmp(selected);
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
        setOpenPicker(null);
      },
      ...bounds,
    },
    dueDate: view.dueDate && { label: TEXTS.dueDateLabel, value: view.dueDate },
    error: view.error,
    wheel: view.wheel && {
      rowCount: view.wheel.columns[0].values.length + 1,
      columns: buildWheelColumns(view.wheel.columns, view.wheel.daysText).map(
        ({ spin: direction, ...column }) => ({
          ...column,
          onClick: direction ? () => tapColumn(direction) : undefined,
        }),
      ),
      nav: {
        previousText: view.wheel.previousHeading,
        nextText: view.wheel.nextHeading,
        previousLabel: TEXTS.previousWeek,
        nextLabel: TEXTS.nextWeek,
        onPrevious: spinPrevious,
        onNext: spinNext,
      },
      onPointerDown: () => {
        dragged.current = false;
      },
      onDragStart: () => {
        dragged.current = true;
      },
      onDragEnd: (offsetX: number, velocityX: number) => spin(swipeDirection(offsetX, velocityX)),
    },
  };
};
