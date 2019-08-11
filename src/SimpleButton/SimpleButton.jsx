import React from 'react';

export default class SimpleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      hasButtonBeenClicked: false
    };
  }

  handleClick = () => {
    this.setState({ counter: this.state.counter + 1 }, () =>
      this.setState({ hasButtonBeenClicked: this.state.counter > 0 })
    );
    // this.props.callback();
  };

  render = () => (
    <button
      onClick={this.handleClick}
      className={this.props.className}
      disabled={this.props.disabled === 'true' || this.props.disabled === true}
    >
      {this.props.text} {this.state.counter}
      {this.state.hasButtonBeenClicked && <div>Button Clicked!</div>}
    </button>
  );
}
