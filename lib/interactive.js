class Calculator {
  sum(a, b) {
    return a + b;
  }
}

class Receipt {
  constructor(calculator) {
    this.calculator = calculator;
  }
  print(itemA, itemB) {
    const total = this.calculator.sum(itemA, itemB);
    console.log(`total receipt ${total.toFixed(2)}`);
  }
}

const JEANS = 80.0;
const SHIRT = 35.0;

const calculator = new Calculator();
const receipt = new Receipt(calculator);

receipt.print(JEANS, SHIRT);
