import React from 'react';
import classnames from 'classnames';

export default function DateDisplay({
  focusedRange,
  defaultColor,
  ranges,
  handleRangeFocusChange,
  formatDateDisplay,
  styles
}) {
  return (
    <div className={styles.dateDisplayWrapper}>
      {ranges.map((range, i) => {
        if (
          range.showDateDisplay === false ||
          (range.disabled && !range.showDateDisplay)
        )
          return null;
        return (
          <div
            className={styles.dateDisplay}
            key={i}
            style={{ color: range.color || defaultColor }}
          >
            <span
              className={classnames(styles.dateDisplayItem, {
                [styles.dateDisplayItemActive]:
                  focusedRange[0] === i && focusedRange[1] === 0
              })}
              onFocus={() => handleRangeFocusChange(i, 0)}
            >
              <input
                disabled={range.disabled}
                readOnly
                value={formatDateDisplay(range.startDate, 'Early')}
              />
            </span>
            <span
              className={classnames(styles.dateDisplayItem, {
                [styles.dateDisplayItemActive]:
                  focusedRange[0] === i && focusedRange[1] === 1
              })}
              onFocus={() => handleRangeFocusChange(i, 1)}
            >
              <input
                disabled={range.disabled}
                readOnly
                value={formatDateDisplay(range.endDate, 'Continuous')}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
}
