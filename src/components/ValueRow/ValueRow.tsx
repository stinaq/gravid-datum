import styles from './ValueRow.module.scss';

export type ValueRowProps = {
  label: string;
  value: string;
  note: string;
  hasData: boolean;
  /** Side rows sit next to a main row with the same label, so they show the value only. */
  variant: 'main' | 'side';
};

export const ValueRow = ({ label, value, note, hasData, variant }: ValueRowProps) => (
  <div className={styles[variant]}>
    <span className={styles.label}>{label}</span>
    <span className={hasData ? styles.value : styles.noData}>{value}</span>
    {note && <span className={styles.note}>{note}</span>}
  </div>
);
