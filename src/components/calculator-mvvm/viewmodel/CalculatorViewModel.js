import { NUMERIC, SYMBOL } from '../utils/ValueTypes';
import {
  IN_PROGRESS_OPERATION,
  FIRST_OPERATION
} from '../utils/CalculatorStates';

export default class CalculatorViewModel {
  constructor(model, emitter) {
    this.model = model;
    this.emitter = emitter;
    this.state = FIRST_OPERATION;

    this.initialize();
  }

  initialize() {
    this.emitter.on('CalculateEvent', _ => {
      this.calculate();
    });

    this.emitter.on('AddValueEvent', content => {
      this.addValue(content.value, content.type);
    });

    this.emitter.on('ResetEvent', _ => {
      this.reset();
    });
  }

  addValue(value, type) {
    let valueToAdd;
    if (type === NUMERIC) {
      valueToAdd = this.getValue(value);
    } else if (type === SYMBOL) {
      valueToAdd = this.checkSymbol(value);
    }

    this.model.add(valueToAdd);
    this.updateDisplayAndState(IN_PROGRESS_OPERATION);
  }

  reset() {
    this.model.reset();
    this.updateDisplayAndState(FIRST_OPERATION);
  }

  calculate(value) {
    this.model.calculate(value);
    this.updateDisplayAndState(FIRST_OPERATION);
  }

  updateDisplayAndState(state) {
    this.state = state;
    this.emitter.emit('UpdateDisplayValue', this.model.total);
  }

  checkSymbol(value) {
    let str = this.model.total;

    if (this.state === FIRST_OPERATION) {
      return str + value;
    }

    return !isNaN(str.charAt(str.length - 1))
      ? str + value
      : str.substr(0, str.length - 1) + value;
  }

  getValue(value) {
    return this.model.total == 0 || this.state === FIRST_OPERATION
      ? value
      : this.model.total + value;
  }
}
