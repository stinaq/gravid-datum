import styles from './Stat.module.scss';

export type StatProps = {
  label: string;
  value: string;
};

export const Stat = ({ label, value }: StatProps) => (
  <p className={styles.stat}>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{value}</span>
  </p>
);
