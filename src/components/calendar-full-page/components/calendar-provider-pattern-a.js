// The provider pattern
import React, { Fragment } from 'react';
import { Switch } from './switch';

const CalendarContext = React.createContext();

class Calendar extends React.Component {
  // Create static Consumer object
  // Why? This will be your <CalendarContext.Consumer/>
  static Consumer = CalendarContext.Consumer;

  // state
  state = {
    dateRange: {
      selection: {
        startDate: new Date(),
        endDate: null,
        key: 'selection'
      },
      // focusedDate: calcFocusDate(null, props),
      drag: {
        status: false,
        range: { startDate: null, endDate: null },
        disablePreview: false
      }
      // scrollArea: this.calcScrollArea(props)
    }
  };

  handleChange = (type, payload) => {
    console.log(type, payload);
    this.setState({
      [type]: payload
    });
  };

  handleRangeChange = (type, payload) => {
    console.log(type, payload);
    this.setState({
      [type]: {
        ...this.state[type],
        ...payload
      }
    });
  };

  calendarToggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onCalendar(this.state.on)
    );

  render() {
    return (
      <CalendarContext.Provider
        value={{
          calendarToggle: this.calendarToggle,
          className: 'PreviewArea',
          moveRangeOnFirstSelection: false,
          on: this.state.on,
          onChange: this.handleRangeChange.bind(this, 'dateRange'),
          ranges: [this.state.dateRange.selection]
        }}
        {...this.props}
      />
    );
  }
}

// Demonstrates multiple deep-nested components
// const Layer1 = () => <Layer2 />;

// const Layer2 = () => (
//   <Calendar.Consumer>
//     {({ on, calendarToggle }) => (
//       <Fragment>
//         {on ? 'The button is on' : 'The button is off'}
//         <Switch on={on} onClick={calendarToggle} />
//       </Fragment>
//     )}
//   </Calendar.Consumer>
// );

function Usage({
  onCalendar = (...args) => console.log('onCalendar', ...args)
}) {
  return (
    <Calendar onCalendar={onCalendar}>
      <Calendar.Consumer>
        {({ on, calendarToggle }) => (
          <Fragment>
            {on ? 'The button is on' : 'The button is off'}
            <Switch on={on} onClick={calendarToggle} />
          </Fragment>
        )}
      </Calendar.Consumer>
    </Calendar>
  );
}

Usage.title = 'Calendar Provider Pattern';

export { Calendar, Usage as default };
