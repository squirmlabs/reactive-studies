import Rx from 'rxjs';
class Calculator {
  constructor() {
    this.VAT = 22;
  }
  sum(...items) {
    let total = 0;
    let i = 0;
    for (let i = 0; i < items.length; i++) {
      total = total + items[i];
      total = total + (items[i] * this.VAT) / 100;
    }
    return total;
  }
}

class Receipt {
  constructor(calculator) {
    this.calculator = calculator;
  }
  print(...items) {
    let total = this.calculator.sum(...items);
    console.log(`total receipt ${total.toFixed(2)}`);
  }
}

const JEANS = 80.0;
const SHIRT = 35.0;

const calculator = new Calculator();
const receipt = new Receipt(calculator);

receipt.print(JEANS, SHIRT);
