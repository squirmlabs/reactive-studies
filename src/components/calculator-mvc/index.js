import React from 'react';
import CalculatorController from './controller/CalculatorController';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.mainController = new CalculatorController();
  }
  componentDidMount() {
    this.mainController.init();
  }
  render() {
    return (
      <React.Fragment>
        <h4 className="bg-primary text-white p-2 m-1">MVC Calculator</h4>
        <div id="calcMVC"></div>
      </React.Fragment>
    );
  }
}
