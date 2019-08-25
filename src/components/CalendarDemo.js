import React, { Component } from 'react';
import { DateRange } from './calendar-full-page';
import Section from './Section';

import 'normalize.css';
import './calendar/theme/styles.css';
import './calendar/theme/default.css';

export default class CalendarDemo extends Component {
  constructor(props, context) {
    super(props, context);

    // It's important to make your shape of your tree here.s
    this.state = {
      dateRange: {
        selection: {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      }
    };
  }

  handleChange(which, payload) {
    console.log(which, payload);
    this.setState({
      [which]: payload
    });
  }

  handleRangeChange(which, payload) {
    console.log(which, payload);
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload
      }
    });
  }

  render() {
    return (
      <main className={'Main'}>
        <Section title="Select a range of Dates">
          <DateRange
            onChange={this.handleRangeChange.bind(this, 'dateRange')}
            moveRangeOnFirstSelection={false}
            ranges={[this.state.dateRange.selection]}
            className={'PreviewArea'}
          />
        </Section>
      </main>
    );
  }
}
