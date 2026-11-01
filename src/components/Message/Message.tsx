import styles from './Message.module.scss';

export type MessageProps = {
  text: string;
};

export const Message = ({ text }: MessageProps) => (
  <p className={styles.message} role="alert">
    {text}
  </p>
);
