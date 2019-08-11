import CalculatorPresenter from './presenter/CalculatorPresenter';
import CalculatorModel from './model/CalculatorModel';
import Calculator from './view/Calculator.jsx';

export default class CalculatorMVP {
  constructor() {
    const mainModel = new CalculatorModel();
    let mainPresenter = new CalculatorPresenter();
    mainPresenter.init(mainModel, Calculator);
  }
}

