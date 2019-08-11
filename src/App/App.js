import React from 'react';
import logo from './logo.svg';
import CalculatorController from '../components/CalculatorMVC/controller/CalculatorController';
import CalculatorPresenter from '../components/CalculatorMVP/presenter/CalculatorPresenter';
import CalculatorModel from '../components/CalculatorMVP/model/CalculatorModel';
import Calculator from '../components/CalculatorMVP/view/Calculator';
import SimpleButton from '../components/SimpleButton';
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
