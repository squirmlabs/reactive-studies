import React from 'react';
import ReactDOM from 'react-dom';
import { LiteEventEmitter } from 'lite-event-emitter';
import Calculator from '../view/Calculator.jsx';
import CalculatorModel from '../model/CalculatorModel';

export default class CalculatorController {
  constructor() {
    return {
      init: ::this.initialize
    };
  }

  initialize() {
    const emitter = this.initEmitter();
    this.model = this.initModel(emitter);
    this.initView(emitter, this.model);
  }

  initEmitter() {
    const emitter = new LiteEventEmitter();
    emitter.on('CalculateEvent', _ => {
      this.model.calculate();
    });

    emitter.on('AddValueEvent', content => {
      this.model.addValue(content.value, content.type);
    });

    emitter.on('ResetEvent', _ => {
      this.model.reset();
    });

    return emitter;
  }

  initView(emitter, model) {
    const cont = document.getElementById('calcMVC');
    ReactDOM.render(<Calculator emitter={emitter} model={model} />, cont);
  }

  initModel(emitter) {
    return new CalculatorModel(emitter);
  }
}
