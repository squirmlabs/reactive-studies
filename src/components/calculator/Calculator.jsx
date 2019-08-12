import React from 'react';
import { ulStyle, acStyle, btnStyle, displayStyle } from './Calculator.css';

const Calculator = props => {
  function createRow(id, ...labels) {
    let items = labels.map((value, index) => (
      <li
        key={`${id}_${index}`}
        style={value === 'AC' ? acStyle : btnStyle}
        onClick={props.onButtonClicked}
      >
        {value}
      </li>
    ));

    return (
      <ul key={id} style={ulStyle}>
        {items}
      </ul>
    );
  }

  return (
    <div>
      <div style={displayStyle}>{props.result}</div>
      {createRow('row1', 'AC')}
      {createRow('row2', '7', '8', '9', '/')}
      {createRow('row3', '4', '5', '6', '*')}
      {createRow('row4', '1', '2', '3', '-')}
      {createRow('row5', '0', '.', '=', '+')}
    </div>
  );
};

export default Calculator;
