import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './view/Calculator.jsx';
import CalculatorViewModel from './viewmodel/CalculatorViewModel';
import CalculatorModel from './model/CalculatorModel';
import { LiteEventEmitter } from 'lite-event-emitter';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.model = new CalculatorModel();
    this.emitter = new LiteEventEmitter();
    this.vm = new CalculatorViewModel(this.model, this.emitter);
  }

  render() {
    return <Calculator emitter={this.emitter} initValue={this.model.total} />;
  }
}
