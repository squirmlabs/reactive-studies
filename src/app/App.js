import React from 'react';
import ReactDOM from 'react-dom';
import { LiteEventEmitter } from 'lite-event-emitter';

import logo from './logo.svg';

// MVC
import CalculatorController from '../../components/calculator-mvc/controller/CalculatorController';

//MVP
import CalculatorPresenter from '../../components/calculator-mvp/presenter/CalculatorPresenter';
import CalculatorModel from '../../components/calculator-mvp/model/CalculatorModel';
import Calculator from '../../components/calculator-mvp/view/Calculator';

// MVVM
import CalcMVVM from '../../components/calculator-mvvm/view/Calculator';
import CalculatorViewModel from '../../components/calculator-mvvm/viewmodel/CalculatorViewModel';
import CalcModelMVVM from '../../components/calculator-mvvm/model/CalculatorModel';

// Other Components
import SimpleButton from '../../components/button';

import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    // MVC
    let calcController = new CalculatorController();
    calcController.init();

    // MVP
    const mainModel = new CalculatorModel();
    const mainPresenter = new CalculatorPresenter();
    mainPresenter.init(mainModel, Calculator);

    // MVVM
    const model = new CalcModelMVVM();
    const emitter = new LiteEventEmitter();
    const vm = new CalculatorViewModel(model, emitter);

    const cont = document.getElementById('calcMVVM');
    ReactDOM.render(
      <CalcMVVM emitter={emitter} initValue={model.total} />,
      cont
    );
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
