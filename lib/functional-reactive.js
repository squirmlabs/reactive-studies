import Rx from 'rxjs';

class Calculator {
  constructor() {
    this.addVAT = this.addVAT.bind(this);
  }
  getTotal(...items) {
    const items$ = Rx.Observable.from(items);
    const total$ = items$.map(this.addVAT).reduce(this.sumElements);
    return total$;
  }
  addVAT(itemValue) {
    return itemValue + this.calculateVAT(itemValue);
  }
  calculateVAT(value) {
    const VAT = 22;
    return (value * VAT) / 100;
  }
  sumElements(accumulator, value) {
    return accumulator + value;
  }
}

class Receipt {
  print(total$) {
    total$.subscribe(total => console.log(`total receipt ${total.toFixed(2)}`));
  }
}

const JEANS = 80.0;
const SHIRT = 35.0;
const SHOES = 90.0;
const COAT = 140.0;
const HAT = 29.0;

const calculator = new Calculator();
const receipt = new Receipt();

receipt.print(calculator.getTotal(JEANS, SHIRT, SHOES, COAT, HAT));
