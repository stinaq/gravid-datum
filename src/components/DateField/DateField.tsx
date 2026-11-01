import { DayPicker } from 'react-day-picker';
import { sv } from 'react-day-picker/locale';
import styles from './DateField.module.scss';

export type DateFieldProps = {
  label: string;
  valueText: string;
  selected?: Date;
  isOpen: boolean;
  startMonth: Date;
  endMonth: Date;
  onToggle: () => void;
  onSelect: (date: Date) => void;
};

export const DateField = ({
  label,
  valueText,
  selected,
  isOpen,
  startMonth,
  endMonth,
  onToggle,
  onSelect,
}: DateFieldProps) => (
  <div className={styles.field}>
    <button type="button" className={styles.trigger} aria-expanded={isOpen} onClick={onToggle}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{valueText}</span>
    </button>
    {isOpen && (
      <div className={styles.calendar}>
        <DayPicker
          mode="single"
          required
          locale={sv}
          selected={selected}
          defaultMonth={selected}
          startMonth={startMonth}
          endMonth={endMonth}
          captionLayout="dropdown"
          onSelect={onSelect}
        />
      </div>
    )}
  </div>
);
