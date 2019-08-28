import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar.js';
import { rangeShape } from './DayCell';
import {
  calculateNewSelection,
  findNextRangeIndex,
  generateStyles
} from '../utils.js';
import classnames from 'classnames';
import coreStyles from '../styleMap';
class DateRange extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleRangeFocusChange = this.handleRangeFocusChange.bind(this);
    this.updatePreview = this.updatePreview.bind(this);
    this.state = {
      focusedRange: props.initialFocusedRange || [
        findNextRangeIndex(props.ranges),
        0
      ],
      preview: null
    };
    this.styles = generateStyles([coreStyles, props.classNames]);
  }

  calcNewSelection = (value, isSingleValue = true) => {
    const focusedRange = this.props.focusedRange || this.state.focusedRange;

    const {
      ranges,
      onChange,
      maxDate,
      moveRangeOnFirstSelection,
      disabledDates
    } = this.props;

    const focusedRangeIndex = focusedRange[0];
    const selectedRange = ranges[focusedRangeIndex];

    return calculateNewSelection(
      disabledDates,
      focusedRange,
      maxDate,
      moveRangeOnFirstSelection,
      onChange,
      selectedRange,
      isSingleValue,
      value
    );
  };

  setSelection = (value, isSingleValue) => {
    const { onChange, ranges, onRangeFocusChange } = this.props;
    const focusedRange = this.state.focusedRange;
    const focusedRangeIndex = focusedRange[0];
    const selectedRange = ranges[focusedRangeIndex];

    if (!selectedRange) return;

    const newSelection = this.calcNewSelection(value, isSingleValue);

    onChange({
      [selectedRange.key || `range${focusedRangeIndex + 1}`]: {
        ...selectedRange,
        ...newSelection.range
      }
    });

    this.setState({
      focusedRange: newSelection.nextFocusRange,
      preview: null
    });

    onRangeFocusChange && onRangeFocusChange(newSelection.nextFocusRange);
  };

  handleRangeFocusChange(focusedRange) {
    this.setState({ focusedRange });

    this.props.onRangeFocusChange &&
      this.props.onRangeFocusChange(focusedRange);
  }

  updatePreview(val) {
    if (!val) {
      this.setState({ preview: null });
      return;
    }
    const { rangeColors, ranges } = this.props;
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const color = ranges[focusedRange[0]].color || rangeColors[focusedRange[0]];
    this.setState({ preview: { ...val.range, color } });
  }

  render() {
    return (
      <Calendar
        focusedRange={this.state.focusedRange}
        onRangeFocusChange={this.handleRangeFocusChange}
        preview={this.state.preview}
        onPreviewChange={value => {
          this.updatePreview(value ? this.calcNewSelection(value) : null);
        }}
        {...this.props}
        displayMode="dateRange"
        className={classnames(
          this.styles.dateRangeWrapper,
          this.props.className
        )}
        onChange={this.setSelection}
        showDateDisplay
        updateRange={val => this.setSelection(val, false)}
        ref={target => {
          this.calendar = target;
        }}
      />
    );
  }
}

DateRange.defaultProps = {
  classNames: {},
  ranges: [],
  moveRangeOnFirstSelection: false,
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  disabledDates: []
};

DateRange.propTypes = {
  ...Calendar.propTypes,
  onChange: PropTypes.func,
  onRangeFocusChange: PropTypes.func,
  className: PropTypes.string,
  ranges: PropTypes.arrayOf(rangeShape),
  moveRangeOnFirstSelection: PropTypes.bool
};

export default DateRange;
