import { DateField } from './components/DateField/DateField';
import { InfoDialog } from './components/InfoDialog/InfoDialog';
import { Message } from './components/Message/Message';
import { Stat } from './components/Stat/Stat';
import { ValueRow } from './components/ValueRow/ValueRow';
import { WeekColumn } from './components/WeekColumn/WeekColumn';
import { WeekNav } from './components/WeekNav/WeekNav';
import { WeekWheel } from './components/WeekWheel/WeekWheel';
import styles from './App.module.scss';
import { useGestation } from './core/gestation/useGestation';

export const App = () => {
  const { title, info, lmp, date, dueDate, error, wheel } = useGestation();

  return (
    <main className={styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <InfoDialog {...info} />
      </div>
      <div className={styles.inputs}>
        <DateField {...lmp} />
        <DateField {...date} />
        {dueDate && <Stat {...dueDate} />}
      </div>
      {error && <Message text={error} />}
      {wheel && (
        <div className={styles.wheel}>
          <WeekNav {...wheel.nav} placement="top" />
          <WeekWheel
            rowCount={wheel.rowCount}
            onPointerDown={wheel.onPointerDown}
            onDragStart={wheel.onDragStart}
            onDragEnd={wheel.onDragEnd}
          >
            {wheel.columns.map(({ key, values, ...column }) => (
              <WeekColumn key={key} {...column}>
                {values.map((v) => (
                  <ValueRow key={v.label} {...v} variant={column.variant} />
                ))}
              </WeekColumn>
            ))}
          </WeekWheel>
          <WeekNav {...wheel.nav} placement="bottom" />
        </div>
      )}
    </main>
  );
};
