import React from 'react';
import ReactDOM from 'react-dom';
import { NUMERIC, SYMBOL } from '../utils/ValueTypes';

export default class CalculatorPresenter {
  constructor() {
    return {
      init: ::this.initialize
    };
  }

  initialize(model, view) {
    this.model = model;
    this.view = view;
    this.cont = document.getElementById('calcMVP');

    this.renderView();
  }

  renderView() {
    const component = React.createElement(this.view, {
      result: this.model.total,
      onBtnClicked: ::this.onBtnClicked
    });
    ReactDOM.render(component, this.cont);
  }
  
  onBtnClicked(value) {
    switch (value) {
      case 'AC':
        this.model.reset();
        break;
      case '=':
        this.model.calculate(value);
        break;
      case '+':
      case '-':
      case '/':
      case '*':
      case '.':
        this.model.addValue(value, SYMBOL);
        break;
      default:
        this.model.addValue(value, NUMERIC);
        break;
    }

    this.renderView();
  }
}
