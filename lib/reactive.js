import Rx from 'rxjs';
class Calculator {
  constructor(itemA, itemB) {
    const obs = Rx.Observable.of(itemA, itemB);
    const sum$ = obs.reduce((acc, item) => acc + item);
    return {
      observable: sum$
    };
  }
}

class Receipt {
  constructor(observable$) {
    observable$.subscribe(value => console.log(`total receipt ${value}`));
  }
}

const JEANS = 80.0;
const SHIRT = 35.0;

const calculator = new Calculator(JEANS, SHIRT);
const receipt = new Receipt(calculator.observable);
