import CalculatorController from './controller/CalculatorController';

export default class CalculatorMVC {
  constructor() {
    let mainController = new CalculatorController();
    mainController.init();
  }
}

