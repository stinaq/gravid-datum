import type { CSSProperties, ReactNode } from 'react';
import { MotionConfig, motion } from 'motion/react';
import styles from './WeekWheel.module.scss';

export type WeekWheelProps = {
  /** Number of grid rows each column spans (header + values), keeps rows aligned. */
  rowCount: number;
  onPointerDown: () => void;
  onDragStart: () => void;
  onDragEnd: (offsetX: number, velocityX: number) => void;
  children: ReactNode;
};

/** The track follows the finger, then springs back while the weeks animate to their new slots. */
export const WeekWheel = ({ rowCount, onPointerDown, onDragStart, onDragEnd, children }: WeekWheelProps) => (
  <MotionConfig reducedMotion="user">
    <div className={styles.viewport}>
      <motion.div
        className={styles.track}
        style={{ '--rows': rowCount } as CSSProperties}
        drag="x"
        dragSnapToOrigin
        dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
        onPointerDownCapture={onPointerDown}
        onDragStart={onDragStart}
        onDragEnd={(_, info) => onDragEnd(info.offset.x, info.velocity.x)}
      >
        {children}
      </motion.div>
    </div>
  </MotionConfig>
);
