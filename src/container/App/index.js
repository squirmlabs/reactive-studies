import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './view/Calculator.jsx';
import CalculatorViewModel from './viewmodel/CalculatorViewModel';
import CalculatorModel from './model/CalculatorModel';
import { LiteEventEmitter } from 'lite-event-emitter';

export default class App {
  constructor() {
    const model = new CalculatorModel();
    const emitter = new LiteEventEmitter();
    const vm = new CalculatorViewModel(model, emitter);

    const cont = document.getElementById('app');
    ReactDOM.render(
      <Calculator emitter={emitter} initValue={model.total} />,
      cont
    );
  }
}

