import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import styles from './WeekColumn.module.scss';

export type WeekColumnProps = {
  /** Grid column in the wheel. Changing it animates the column to its new place. */
  slot: number;
  variant: 'main' | 'side';
  heading: string;
  headingLabel: string;
  subheading: string;
  subheadingLabel: string;
  offscreen: boolean;
  /** Side columns are tappable and spin the wheel. */
  onClick?: () => void;
  ariaLabel: string;
  children: ReactNode;
};

const slide = { type: 'spring', bounce: 0, duration: 0.4 } as const;

// One element per week, whatever its slot, so it can move (and restyle) instead of being replaced.
// Every column has the same width, so only its position animates and the text never stretches.
export const WeekColumn = ({
  slot,
  variant,
  heading,
  headingLabel,
  subheading,
  subheadingLabel,
  offscreen,
  onClick,
  ariaLabel,
  children,
}: WeekColumnProps) => (
  <motion.section
    layout="position"
    transition={slide}
    className={styles[variant]}
    style={{ gridColumn: slot }}
    aria-hidden={offscreen}
  >
    <div className={styles.header}>
      <span className={styles.headingLabel}>{headingLabel}</span>
      <span className={styles.heading}>{heading}</span>
      <span className={styles.subheading}>
        {subheadingLabel}: <strong>{subheading}</strong>
      </span>
    </div>
    {children}
    {onClick && <button type="button" className={styles.hit} onClick={onClick} aria-label={ariaLabel} />}
  </motion.section>
);
