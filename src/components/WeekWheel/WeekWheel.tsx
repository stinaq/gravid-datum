import type { CSSProperties, ReactNode } from 'react';
import styles from './WeekWheel.module.scss';

export type WeekWheelProps = {
  previous?: ReactNode;
  current: ReactNode;
  next?: ReactNode;
  /** Number of grid rows each column spans (header + values), keeps rows aligned. */
  rowCount: number;
  animation: 'none' | 'fromLeft' | 'fromRight';
  animationKey: string;
  onSwipeStart: (x: number) => void;
  onSwipeEnd: (x: number) => void;
};

export const WeekWheel = ({
  previous,
  current,
  next,
  rowCount,
  animation,
  animationKey,
  onSwipeStart,
  onSwipeEnd,
}: WeekWheelProps) => (
  <div
    className={styles.viewport}
    onTouchStart={(e) => onSwipeStart(e.changedTouches[0].clientX)}
    onTouchEnd={(e) => onSwipeEnd(e.changedTouches[0].clientX)}
  >
    <div
      key={animationKey}
      className={`${styles.wheel} ${styles[animation]}`}
      style={{ '--rows': rowCount } as CSSProperties}
    >
      <div className={styles.slot}>{previous}</div>
      <div className={styles.slot}>{current}</div>
      <div className={styles.slot}>{next}</div>
    </div>
  </div>
);
