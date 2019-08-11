import Rx from 'rxjs';

class Calculator {
  constructor() {
    this.VAT = 22;
  }
  sum(items) {
    const items$ = Rx.Observable.from(items);
    const total$ = items$
      .map(value => value + (value * this.VAT) / 100)
      .reduce((acc, value) => acc + value);
    return total$;
  }
}

class Receipt {
  constructor(calculator) {
    this.calculator = calculator;
  }
  print(...items) {
    const total$ = this.calculator.sum(items);
    total$.subscribe(total => console.log(`total receipt ${total.toFixed(2)}`));
  }
}

const JEANS = 80.0;
const SHIRT = 35.0;
const SHOES = 90.0;
const COAT = 140.0;
const HAT = 29.0;

const calculator = new Calculator();
const receipt = new Receipt(calculator);

receipt.print(JEANS, SHIRT, SHOES, COAT, HAT);
