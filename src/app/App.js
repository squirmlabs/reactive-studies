import React from 'react';

// ==================================================================
import JssProvider from '../providers/JssProvider';

import logo from './logo.svg';

// ==================================================================
// // MVC
import CalculatorMVC from '../components/calculator-mvc';

// //MVP
import CalculatorMVP from '../components/calculator-mvp';

// // MVVM
import CalculatorMVVM from '../components/calculator-mvvm';
// ==================================================================

// Other Components
import SimpleButton from '../components/button';

import './App.css';

export default function App(props) {
  return (
    <JssProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <CalculatorMVVM />
        <CalculatorMVP />
        <CalculatorMVC />
        <SimpleButton className="btn btn-primary" text="Simple Button" />
      </div>
    </JssProvider>
  );
}
