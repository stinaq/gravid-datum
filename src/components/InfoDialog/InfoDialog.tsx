import { useRef } from 'react';
import styles from './InfoDialog.module.scss';

export type InfoDialogProps = {
  buttonLabel: string;
  title: string;
  intro: string;
  measures: string;
  closeLabel: string;
};

const InfoIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="4.8" r="0.9" fill="currentColor" />
    <path d="M8 7.2v4.6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const InfoDialog = ({ buttonLabel, title, intro, measures, closeLabel }: InfoDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => dialogRef.current?.showModal()}
        aria-label={buttonLabel}
      >
        <InfoIcon />
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        <h2 className={styles.heading}>{title}</h2>
        <p>{intro}</p>
        <p>{measures}</p>
        <button type="button" className={styles.close} onClick={close}>
          {closeLabel}
        </button>
      </dialog>
    </>
  );
};
