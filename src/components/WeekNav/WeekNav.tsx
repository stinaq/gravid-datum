import styles from './WeekNav.module.scss';

export type WeekNavProps = {
  /** Heading of the previous week. The button is left out when there is none. */
  previousText?: string;
  nextText?: string;
  previousLabel: string;
  nextLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  /** The bottom bar is for thumbs on touch devices and is hidden on desktop. */
  placement: 'top' | 'bottom';
};

const Chevron = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M10 3 5 8l5 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WeekNav = ({
  previousText,
  nextText,
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
  placement,
}: WeekNavProps) => (
  <nav className={styles[placement]}>
    {previousText && (
      <button
        type="button"
        className={styles.previous}
        onClick={onPrevious}
        aria-label={`${previousLabel} ${previousText}`}
      >
        <Chevron className={styles.icon} />
        {previousText}
      </button>
    )}
    {nextText && (
      <button type="button" className={styles.next} onClick={onNext} aria-label={`${nextLabel} ${nextText}`}>
        {nextText}
        <Chevron className={styles.iconFlipped} />
      </button>
    )}
  </nav>
);
