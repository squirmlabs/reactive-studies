import React from 'react';
import ReactDOM from 'react-dom';
import { LiteEventEmitter } from 'lite-event-emitter';

import logo from './logo.svg';

// MVC
import CalculatorController from '../../component/CalculatorMVC/controller/CalculatorController';

//MVP
import CalculatorPresenter from '../../component/CalculatorMVP/presenter/CalculatorPresenter';
import CalculatorModel from '../../component/CalculatorMVP/model/CalculatorModel';
import Calculator from '../../component/CalculatorMVP/view/Calculator';

// MVVM
import CalcMVVM from '../../component/CalculatorMVVM/view/Calculator';
import CalculatorViewModel from '../../component/CalculatorMVVM/viewmodel/CalculatorViewModel';
import CalcModelMVVM from '../../component/CalculatorMVVM/model/CalculatorModel';

// Other Components
import SimpleButton from '../../component/SimpleButton';

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
