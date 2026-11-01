import type { ReactNode } from 'react';
import styles from './WeekColumn.module.scss';

export type WeekColumnProps = {
  heading: string;
  headingLabel?: string;
  subheading?: string;
  subheadingLabel?: string;
  /** Side columns are tappable and spin the wheel. */
  onClick?: () => void;
  ariaLabel?: string;
  children: ReactNode;
};

export const WeekColumn = ({
  heading,
  headingLabel,
  subheading,
  subheadingLabel,
  onClick,
  ariaLabel,
  children,
}: WeekColumnProps) => {
  const header = (
    <div className={styles.header}>
      {headingLabel && <span className={styles.headingLabel}>{headingLabel}</span>}
      <span className={styles.heading}>{heading}</span>
      {subheading && (
        <span className={styles.subheading}>
          {subheadingLabel}: <strong>{subheading}</strong>
        </span>
      )}
    </div>
  );

  return onClick ? (
    <button type="button" className={styles.side} onClick={onClick} aria-label={ariaLabel}>
      {header}
      {children}
    </button>
  ) : (
    <section className={styles.main}>
      {header}
      {children}
    </section>
  );
};
