import React from 'react';
import CalculatorPresenter from './presenter/CalculatorPresenter';
import CalculatorModel from './model/CalculatorModel';
import Calculator from './view/Calculator.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.mainModel = new CalculatorModel();
    this.mainPresenter = new CalculatorPresenter();
    this.mainPresenter.init(this.mainModel, Calculator);
  }
  render() {
    return (
      <React.Fragment>
        <h4 className="bg-primary text-white p-2 m-1">MVP Calculator</h4>
        <div id="calcMVP"></div>
      </React.Fragment>
    );
  }
}
