import * as mathjs from 'mathjs';
import { NUMERIC, SYMBOL } from '../utils/ValueTypes';
import {
  IN_PROGRESS_OPERATION,
  FIRST_OPERATION
} from '../utils/CalculatorStates';

export default class CalculatorModel {
  constructor() {
    this.totalOperation = 0;
  }

  calculate() {
    this.totalOperation = mathjs.evaluate(this.totalOperation);
    this.state = FIRST_OPERATION;
  }

  addValue(value, type) {
    if (type === NUMERIC) {
      this.totalOperation = this.getValue(value);
    } else if (type === SYMBOL) {
      this.totalOperation = this.checkSymbol(value);
    }

    this.state = IN_PROGRESS_OPERATION;
  }

  checkSymbol(value) {
    let str = this.totalOperation;

    if (this.state === FIRST_OPERATION) {
      return str + value;
    }

    return !isNaN(str.charAt(str.length - 1))
      ? str + value
      : str.substr(0, str.length - 1) + value;
  }

  getValue(value) {
    return this.totalOperation === 0 || this.state === FIRST_OPERATION
      ? value
      : this.totalOperation + value;
  }

  reset() {
    this.totalOperation = 0;
    this.state = FIRST_OPERATION;
  }

  get total() {
    return this.totalOperation;
  }
}
