import { DateField } from './components/DateField/DateField';
import { Message } from './components/Message/Message';
import { Stat } from './components/Stat/Stat';
import { ValueRow } from './components/ValueRow/ValueRow';
import { WeekColumn } from './components/WeekColumn/WeekColumn';
import { WeekWheel } from './components/WeekWheel/WeekWheel';
import styles from './App.module.scss';
import { useGestation } from './core/gestation/useGestation';

export const App = () => {
  const { title, lmp, date, dueDate, error, wheel } = useGestation();

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.inputs}>
        <DateField {...lmp} />
        <DateField {...date} />
        {dueDate && <Stat {...dueDate} />}
      </div>
      {error && <Message text={error} />}
      {wheel && (
        <WeekWheel
          rowCount={wheel.rowCount}
          animation={wheel.animation}
          animationKey={wheel.animationKey}
          onSwipeStart={wheel.onSwipeStart}
          onSwipeEnd={wheel.onSwipeEnd}
          previous={
            wheel.previous && (
              <WeekColumn heading={wheel.previous.heading} onClick={wheel.onPrevious} ariaLabel={wheel.previousLabel}>
                {wheel.previous.values.map((v) => (
                  <ValueRow key={v.label} {...v} variant="side" />
                ))}
              </WeekColumn>
            )
          }
          current={
            <WeekColumn
              heading={wheel.current.heading}
              headingLabel={wheel.ageLabel}
              subheading={wheel.daysText}
              subheadingLabel={wheel.daysLabel}
            >
              {wheel.current.values.map((v) => (
                <ValueRow key={v.label} {...v} variant="main" />
              ))}
            </WeekColumn>
          }
          next={
            wheel.next && (
              <WeekColumn heading={wheel.next.heading} onClick={wheel.onNext} ariaLabel={wheel.nextLabel}>
                {wheel.next.values.map((v) => (
                  <ValueRow key={v.label} {...v} variant="side" />
                ))}
              </WeekColumn>
            )
          }
        />
      )}
    </main>
  );
};
