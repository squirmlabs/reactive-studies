import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { rangeShape } from './DayCell';
import Month from './Month';
import DateDisplay from './DateDisplay';
import MonthAndYear from './MonthAndYear';
import { calcFocusDate, generateStyles } from '../utils';
import classnames from 'classnames';
import {
  addMonths,
  format,
  isSameDay,
  addYears,
  setYear,
  setMonth,
  min,
  max
} from 'date-fns';
import defaultLocale from 'date-fns/locale/en-US';
import coreStyles from '../styleMap';
class Calendar extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.dateOptions = { locale: props.locale };
    this.styles = generateStyles([coreStyles, props.classNames]);
    this.listSizeCache = {};
    this.state = {
      focusedDate: calcFocusDate(null, props),
      drag: {
        status: false,
        range: { startDate: null, endDate: null },
        disablePreview: false
      }
    };
  }

  focusToDate = date => {
    this.setState({ focusedDate: date });
    return;
  };

  updatePreview = val => {
    if (!val) {
      this.setState({ preview: null });
      return;
    }
    const preview = {
      startDate: val,
      endDate: val,
      color: this.props.color
    };
    this.setState({ preview });
  };

  changeShownDate = (value, mode = 'set') => {
    const { focusedDate } = this.state;

    const { onShownDateChange, minDate, maxDate } = this.props;

    const modeMapper = {
      monthOffset: () => addMonths(focusedDate, value),
      setMonth: () => setMonth(focusedDate, value),
      setYear: () => setYear(focusedDate, value),
      set: () => value
    };

    const newDate = min([max([modeMapper[mode](), minDate]), maxDate]);

    this.focusToDate(newDate, false);

    onShownDateChange && onShownDateChange(newDate);
  };

  handleRangeFocusChange = (rangesIndex, rangeItemIndex) => {
    this.props.onRangeFocusChange &&
      this.props.onRangeFocusChange([rangesIndex, rangeItemIndex]);
  };

  renderMonthAndYear = (focusedDate, changeShownDate, props) => {
    const {
      showMonthArrow,
      locale,
      minDate,
      maxDate,
      showMonthAndYearPickers
    } = props;

    const upperYearLimit = (
      maxDate || Calendar.defaultProps.maxDate
    ).getFullYear();

    const lowerYearLimit = (
      minDate || Calendar.defaultProps.minDate
    ).getFullYear();

    const styles = this.styles;

    return (
      <MonthAndYear
        changeShownDate={changeShownDate}
        focusedDate={focusedDate}
        locale={locale}
        minDate={minDate}
        maxDate={maxDate}
        showMonthArrow={showMonthArrow}
        showMonthAndYearPickers={showMonthAndYearPickers}
        styles={styles}
        upperYearLimit={upperYearLimit}
        lowerYearLimit={lowerYearLimit}
      />
    );
  };

  renderDateDisplay = () => {
    const { focusedRange, color, ranges, rangeColors } = this.props;
    return (
      <DateDisplay
        defaultColor={rangeColors[focusedRange[0]] || color}
        focusedRange={focusedRange}
        handleRangeFocusChange={this.handleRangeFocusChange}
        formatDateDisplay={this.formatDateDisplay}
        color={color}
        ranges={ranges}
        rangeColors={rangeColors}
        styles={this.styles}
      />
    );
  };

  onDragSelectionStart = date => {
    const { onChange, dragSelectionEnabled } = this.props;

    if (dragSelectionEnabled) {
      this.setState({
        drag: {
          status: true,
          range: { startDate: date, endDate: date },
          disablePreview: true
        }
      });
    } else {
      onChange && onChange(date);
    }
  };

  onDragSelectionEnd = date => {
    const {
      updateRange,
      displayMode,
      onChange,
      dragSelectionEnabled
    } = this.props;

    if (!dragSelectionEnabled) return;

    if (displayMode === 'date' || !this.state.drag.status) {
      onChange && onChange(date);
      return;
    }

    const newRange = {
      startDate: this.state.drag.range.startDate,
      endDate: date
    };

    if (displayMode !== 'dateRange' || isSameDay(newRange.startDate, date)) {
      this.setState(
        { drag: { status: false, range: {} } },
        () => onChange && onChange(date)
      );
    } else {
      this.setState({ drag: { status: false, range: {} } }, () => {
        updateRange && updateRange(newRange);
      });
    }
  };

  onDragSelectionMove = date => {
    const { drag } = this.state;
    if (!drag.status || !this.props.dragSelectionEnabled) return;
    this.setState({
      drag: {
        status: drag.status,
        range: { startDate: drag.range.startDate, endDate: date },
        disablePreview: true
      }
    });
  };

  formatDateDisplay = (date, defaultText) => {
    if (!date) return defaultText;
    return format(date, this.props.dateDisplayFormat, this.dateOptions);
  };

  render() {
    const {
      showDateDisplay,
      onPreviewChange,
      disabledDates,
      rangeColors,
      color
    } = this.props;

    const { focusedDate } = this.state;

    const ranges = this.props.ranges.map((range, i) => ({
      ...range,
      color: range.color || rangeColors[i] || color
    }));

    return (
      <div
        className={classnames(
          this.styles.calendarWrapper,
          this.props.className
        )}
        onMouseUp={() => this.setState({ drag: { status: false, range: {} } })}
        onMouseLeave={() => {
          this.setState({ drag: { status: false, range: {} } });
        }}
      >
        {showDateDisplay && this.renderDateDisplay()}

        {this.renderMonthAndYear(focusedDate, this.changeShownDate, this.props)}

        {
          <div
            className={classnames(
              this.styles.months,
              this.styles.monthsHorizontal
            )}
          >
            {new Array(this.props.months).fill(null).map((_, i) => {
              const monthStep = addMonths(this.state.focusedDate, i);
              return (
                <Month
                  {...this.props}
                  onPreviewChange={
                    this.props.onPreviewChange || this.updatePreview
                  }
                  preview={this.props.preview || this.state.preview}
                  ranges={ranges}
                  key={i}
                  drag={this.state.drag}
                  dateOptions={this.dateOptions}
                  disabledDates={disabledDates}
                  month={monthStep}
                  onDragSelectionStart={this.onDragSelectionStart}
                  onDragSelectionEnd={this.onDragSelectionEnd}
                  onDragSelectionMove={this.onDragSelectionMove}
                  onMouseLeave={() => onPreviewChange && onPreviewChange()}
                  styles={this.styles}
                  showWeekDays={i === 0}
                  showMonthName={i > 0}
                />
              );
            })}
          </div>
        }
      </div>
    );
  }
}

Calendar.defaultProps = {
  showMonthArrow: true,
  showMonthAndYearPickers: true,
  disabledDates: [],
  classNames: {},
  locale: defaultLocale,
  ranges: [],
  focusedRange: [0, 0],
  dateDisplayFormat: 'MMM D, YYYY',
  showDateDisplay: false,
  showPreview: true,
  displayMode: 'date',
  months: 1,
  color: '#3d91ff',
  scroll: {
    enabled: false
  },
  direction: 'vertical',
  maxDate: addYears(new Date(), 20),
  minDate: addYears(new Date(), -100),
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  dragSelectionEnabled: true
};

Calendar.propTypes = {
  showMonthArrow: PropTypes.bool,
  showMonthAndYearPickers: PropTypes.bool,
  disabledDates: PropTypes.array,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  date: PropTypes.object,
  onChange: PropTypes.func,
  onPreviewChange: PropTypes.func,
  onRangeFocusChange: PropTypes.func,
  classNames: PropTypes.object,
  locale: PropTypes.object,
  shownDate: PropTypes.object,
  onShownDateChange: PropTypes.func,
  ranges: PropTypes.arrayOf(rangeShape),
  preview: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    color: PropTypes.string
  }),
  dateDisplayFormat: PropTypes.string,
  focusedRange: PropTypes.arrayOf(PropTypes.number),
  initialFocusedRange: PropTypes.arrayOf(PropTypes.number),
  months: PropTypes.number,
  className: PropTypes.string,
  showDateDisplay: PropTypes.bool,
  showPreview: PropTypes.bool,
  displayMode: PropTypes.oneOf(['dateRange', 'date']),
  color: PropTypes.string,
  updateRange: PropTypes.func,
  scroll: PropTypes.shape({
    enabled: PropTypes.bool,
    monthHeight: PropTypes.number,
    longMonthHeight: PropTypes.number,
    monthWidth: PropTypes.number,
    calendarWidth: PropTypes.number,
    calendarHeight: PropTypes.number
  }),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  navigatorRenderer: PropTypes.func,
  rangeColors: PropTypes.arrayOf(PropTypes.string),
  dragSelectionEnabled: PropTypes.bool
};

export default Calendar;
