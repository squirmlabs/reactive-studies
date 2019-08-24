import React from 'react';

// ==================================================================
import JssProvider from '../providers/JssProvider';

import logo from './logo.svg';

// ==================================================================
// // MVC
// import CalculatorMVC from '../components/calculator-mvc';

// //MVP
// import CalculatorMVP from '../components/calculator-mvp';

// // MVVM
// import CalculatorMVVM from '../components/calculator-mvvm';
// ==================================================================

// Other Components
// import SimpleButton from '../components/button';

// Demos
import CalendarDemo from '../components/CalendarDemo';
import CalendarToggle from '../components/calendar/components/calendar-provider-pattern-a';

import './App.css';

export default function App(props) {
  return (
    <JssProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <CalendarDemo />
        {/* <CalculatorMVVM />
        <CalculatorMVP />
        <CalculatorMVC /> */}
        <CalendarToggle />
        {/* <SimpleButton className="btn btn-primary" text="Simple Button" /> */}
      </div>
    </JssProvider>
  );
}
