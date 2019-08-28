import classnames from 'classnames';
import {
  addMonths,
  areIntervalsOverlapping,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isBefore,
  differenceInCalendarDays,
  addDays,
  min,
  isWithinInterval,
  max
} from 'date-fns';

export function calcFocusDate(currentFocusedDate, props) {
  const { shownDate, date, months, ranges, focusedRange, displayMode } = props;
  // find primary date according the props
  let targetInterval;
  if (displayMode === 'dateRange') {
    const range = ranges[focusedRange[0]] || {};
    targetInterval = {
      start: range.startDate,
      end: range.endDate
    };
  } else {
    targetInterval = {
      start: date,
      end: date
    };
  }
  targetInterval.start = startOfMonth(targetInterval.start || new Date());
  targetInterval.end = endOfMonth(targetInterval.end || targetInterval.start);
  const targetDate =
    targetInterval.start || targetInterval.end || shownDate || new Date();

  // initial focus
  if (!currentFocusedDate) return shownDate || targetDate;

  // // just return targetDate for native scrolled calendars
  // if (props.scroll.enabled) return targetDate;
  const currentFocusInterval = {
    start: startOfMonth(currentFocusedDate),
    end: endOfMonth(addMonths(currentFocusedDate, months - 1))
  };
  if (areIntervalsOverlapping(targetInterval, currentFocusInterval)) {
    // don't change focused if new selection in view area
    return currentFocusedDate;
  }
  return targetDate;
}

export function findNextRangeIndex(ranges, currentRangeIndex = -1) {
  const nextIndex = ranges.findIndex(
    (range, i) =>
      i > currentRangeIndex && range.autoFocus !== false && !range.disabled
  );
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex(
    range => range.autoFocus !== false && !range.disabled
  );
}

export function getMonthDisplayRange(date, dateOptions) {
  const startDateOfMonth = startOfMonth(date, dateOptions);
  const endDateOfMonth = endOfMonth(date, dateOptions);
  const startDateOfCalendar = startOfWeek(startDateOfMonth, dateOptions);
  const endDateOfCalendar = endOfWeek(endDateOfMonth, dateOptions);
  return {
    start: startDateOfCalendar,
    end: endDateOfCalendar,
    startDateOfMonth,
    endDateOfMonth
  };
}

export function generateStyles(sources) {
  if (!sources.length) return {};
  const generatedStyles = sources
    .filter(source => Boolean(source))
    .reduce((styles, styleSource) => {
      Object.keys(styleSource).forEach(key => {
        styles[key] = classnames(styles[key], styleSource[key]);
      });
      return styles;
    }, {});
  return generatedStyles;
}

export function calculateNewSelection(
  disabledDates,
  focusedRange,
  maxDate,
  moveRangeOnFirstSelection,
  onChange,
  selectedRange,
  isSingleValue = true,
  value
) {
  if (!selectedRange || !onChange) return {};

  let { startDate, endDate } = selectedRange;

  if (!endDate) endDate = new Date(startDate);

  let nextFocusRange;

  if (!isSingleValue) {
    startDate = value.startDate;
    endDate = value.endDate;
  } else if (focusedRange[1] === 0) {
    // startDate selection
    const dayOffset = differenceInCalendarDays(endDate, startDate);

    startDate = value;

    endDate = moveRangeOnFirstSelection ? addDays(value, dayOffset) : value;

    if (maxDate) endDate = min([endDate, maxDate]);

    nextFocusRange = [focusedRange[0], 1];
  } else {
    endDate = value;
  }

  // reverse dates if startDate before endDate
  let isStartDateSelected = focusedRange[1] === 0;

  if (isBefore(endDate, startDate)) {
    isStartDateSelected = !isStartDateSelected;
    [startDate, endDate] = [endDate, startDate];
  }

  const inValidDatesWithinRange = disabledDates.filter(disabledDate =>
    isWithinInterval(disabledDate, {
      start: startDate,
      end: endDate
    })
  );

  if (inValidDatesWithinRange.length > 0) {
    if (isStartDateSelected) {
      startDate = addDays(max(inValidDatesWithinRange), 1);
    } else {
      endDate = addDays(min(inValidDatesWithinRange), -1);
    }
  }

  if (!nextFocusRange) {
    const nextFocusRangeIndex = findNextRangeIndex(
      this.props.ranges,
      focusedRange[0]
    );
    nextFocusRange = [nextFocusRangeIndex, 0];
  }

  return {
    wasValid: !(inValidDatesWithinRange.length > 0),
    range: { startDate, endDate },
    nextFocusRange: nextFocusRange
  };
}
