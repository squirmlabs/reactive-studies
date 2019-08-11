import React from 'react';
import logo from './logo.svg';
import CalculatorController from '../CalculatorMVC/controller/CalculatorController';
import CalculatorPresenter from '../CalculatorMVP/presenter/CalculatorPresenter';
import CalculatorModel from '../CalculatorMVP/model/CalculatorModel';
import Calculator from '../CalculatorMVP/view/Calculator';
import SimpleButton from '../SimpleButton';
import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    let calcController = new CalculatorController();
    calcController.init();
    const mainModel = new CalculatorModel();
    const mainPresenter = new CalculatorPresenter();
    mainPresenter.init(mainModel, Calculator);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <SimpleButton className="btn btn-primary" text="Simple Button" />
      </div>
    );
  }
}
