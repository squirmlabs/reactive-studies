import * as mathjs from 'mathjs';
import { TOTAL_CHANGED_EVENT, CALCULATE_EVENT} from '../events/OperationsEvent';

export default class CalculatorModel {
  constructor() {
    this.totalOperation = 0;
  }

  calculate(operation) {
    this.totalOperation = mathjs.evaluate(this.totalOperation);
  }

  add(value) {
    this.totalOperation = value;
  }

  reset() {
    this.totalOperation = 0;
  }

  get total() {
    return this.totalOperation;
  }
}
