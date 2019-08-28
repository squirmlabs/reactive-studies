import React from 'react';
import classnames from 'classnames';

export default function MonthAndYear({
  changeShownDate, 
  focusedDate,
  locale,
  lowerYearLimit,
  showMonthArrow,
  showMonthAndYearPickers,
  styles,
  upperYearLimit
}) {
  return (
    <div
      onMouseUp={e => e.stopPropagation()}
      className={styles.monthAndYearWrapper}
    >
      {showMonthArrow ? (
        <button
          type="button"
          className={classnames(styles.nextPrevButton, styles.prevButton)}
          onClick={() => changeShownDate(-1, 'monthOffset')}
        >
          <i />
        </button>
      ) : null}
      {showMonthAndYearPickers ? (
        <span className={styles.monthAndYearPickers}>
          <span className={styles.monthPicker}>
            <select
              value={focusedDate.getMonth()}
              onChange={e => changeShownDate(e.target.value, 'setMonth')}
            >
              {locale.localize.months().map((month, i) => (
                <option key={i} value={i}>
                  {month}
                </option>
              ))}
            </select>
          </span>
          <span className={styles.monthAndYearDivider} />
          <span className={styles.yearPicker}>
            <select
              value={focusedDate.getFullYear()}
              onChange={e => changeShownDate(e.target.value, 'setYear')}
            >
              {new Array(upperYearLimit - lowerYearLimit + 1)
                .fill(upperYearLimit)
                .map((val, i) => {
                  const year = val - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
            </select>
          </span>
        </span>
      ) : (
        <span className={styles.monthAndYearPickers}>
          {locale.localize.months()[focusedDate.getMonth()]}{' '}
          {focusedDate.getFullYear()}
        </span>
      )}
      {showMonthArrow ? (
        <button
          type="button"
          className={classnames(styles.nextPrevButton, styles.nextButton)}
          onClick={() => changeShownDate(+1, 'monthOffset')}
        >
          <i />
        </button>
      ) : null}
    </div>
  );
}
