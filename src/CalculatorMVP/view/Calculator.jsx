import React from 'react';
import { ulStyle, acStyle, btnStyle, displayStyle } from './Calculator.css';

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.btnClicked = this.props.onBtnClicked;
  }

  onButtonClicked(evt) {
    evt.preventDefault();
    this.btnClicked(evt.target.innerHTML);
  }

  createRow(id, ...labels) {
    let items = labels.map((value, index) => {
      return (
        <li
          key={`${id}_${index}`}
          style={value === 'AC' ? acStyle : btnStyle}
          onClick={::this.onButtonClicked}
        >
          {value}
        </li>
      );
    });

    return (
      <ul key={id} style={ulStyle}>
        {items}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <div style={displayStyle}>{this.props.result}</div>
        {this.createRow('row1', 'AC')}
        {this.createRow('row2', '7', '8', '9', '/')}
        {this.createRow('row3', '4', '5', '6', '*')}
        {this.createRow('row4', '1', '2', '3', '-')}
        {this.createRow('row5', '0', '.', '=', '+')}
      </div>
    );
  }
}
