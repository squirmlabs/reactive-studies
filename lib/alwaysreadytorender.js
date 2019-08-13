import React, { useState } from 'react';
/**  Always Be Ready to Render
 *
 * React components let you write rendering code without worrying too much about time. You describe how the UI should look at any given moment, and React makes it happen. Take advantage of that model!
 *
 *
 *Don’t try to introduce unnecessary timing assumptions into your component behavior. Your component should be ready to re-render at any time.

How can one violate this principle? React doesn’t make it very easy — but you can do it by using the legacy componentWillReceiveProps lifecycle method:
 *
 */

class ShittyTextInput extends React.Component {
  state = {
    value: ''
  };
  // 🔴 Resets local state on every parent render
  // 🔴 The problem with this pattern is that it entirely relies on accidental timing.
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  render() {
    return <input value={this.state.value} onChange={this.handleChange} />;
  }
}

/**
 * You might add some animation to the parent of ShittyTextInput. If its parent re-renders more often, it will keep “blowing away” the child state! You can read more about this problem in “You Probably Don’t Need Derived State”.
 */

/**
 * How do we fix this?
 *
 * Fix your mental model.
 *
 * Stop thinking of “receiving props” as something different from just “rendering”.
 *
 *  A re-render caused by a parent shouldn’t behave differently from a re-render caused by our own local state change.
 *
 * Components should be resilient to rendering less or more often because otherwise they’re too coupled to their particular parents.
 */

// Option 1: Fully controlled component.
function TextInput({ value, onChange }) {
  return <input value={value} onChange={onChange} />;
}

// Option 2: Fully uncontrolled component.
function HookedTextInput() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}

// We can reset its internal state later by changing the key:
function Form({ formId }) {
  return <TextInput key={formId} />;
}

/**
The takeaway from this section is that your component shouldn’t break just because it or its parent re-renders more often. The React API design makes it easy if you avoid the legacy componentWillReceiveProps lifecycle method.
*/

class StressTest extends React.Component {
  // To stress-test your component, you can temporarily add this code to its parent:
  componentDidMount() {
    // Don't forget to remove this immediately!
    setInterval(() => this.forceUpdate(), 100);
  }
  render() {
    return <input value={this.state.value} onChange={this.handleChange} />;
  }
}
