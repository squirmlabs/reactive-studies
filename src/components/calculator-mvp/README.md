# MVP Calculator

The main differences between CalculatorMVP and CalculatorMVC :

- Presenter instead of a controller
- The relation between a view and a presenter is always 1 to 1.
- Passive views for reusable components
- The contract between the presenter and the view allows for easy component swapping.

The presenter object is inspired by the presentation model pattern.

A great implementation is when the presenter is designed as a `Supervising Controller` where it retrieves and updates the data useful for a view from the model. In parallel it should handle any user interaction updating the model, and retrieving the data needed to render the view.

Complex applications usually have a persistence model across the life cycle of an application. With this we could have multiple presenters that retrieve and update the application model data.

The views are passive. They just know how the rendering logic works, which leave room for integrating with CSS styles and animation.

The model and the view should not be aware of each other. Maintaining isolation between the two responsibilities will help in the case of larger applications or when we need to swap views for targeting different devices.

We could have the exact same application but with different input methods and UI patterns for different targets.

With an MVP architecture, we do the following. We maintain the behaviors inside the presenter, the business domain in the model and use `passive views` for the UI.

This allows us to have similar behaviors across the application, reusing the same code for the models and views. This also allows us to adapt target devices without much effort.

An architecture that improved the `MVC` concept created 10 years before it. With its' separation of concerns, `MVP` is very strong contender. If we properly apply these few concepts, our applications will benefit from better debugging and better maintainability.

## Initialize

We create the model and the presenter in the constructor. We also inject React component and model inside the presenter.

```js
// src/App/App.js

constructor() {
  super();
  const mainModel = new CalculatorModel();
  const mainPresenter = new CalculatorPresenter();
  mainPresenter.init(mainModel, Calculator);
}
```

## Model

The model is taking care of all the calculations and maintaining the application state. That will facilitate the debugging of our application. The model keeps the application state and the caching of application data. The `View` is solely responsible for the UI of our application. The `Presenter` is handling the user interactions.

In the model, we have all the methods called by the `Presenter`, like
`reset`, `calculate`, `addValue`. Also we have a `checkSymbol` and `getValue`, which is used for handling the application logic.



```js
// src/CalculatorMVP/model/CalculatorModel.js

export default class CalculatorModel {
  constructor() {
    this.totalOperation = 0;
  }

  calculate() {
    this.totalOperation = mathjs.evaluate(this.totalOperation);
    this.state = FIRST_OPERATION;
  }

  addValue(value, type) {
    if (type === NUMERIC) {
      this.totalOperation = this.getValue(value);
    } else if (type === SYMBOL) {
      this.totalOperation = this.checkSymbol(value);
    }

    this.state = IN_PROGRESS_OPERATION;
  }

  checkSymbol(value) {
    let str = this.totalOperation;

    if (this.state === FIRST_OPERATION) {
      return str + value;
    }

    return !isNaN(str.charAt(str.length - 1))
      ? str + value
      : str.substr(0, str.length - 1) + value;
  }

  getValue(value) {
    return this.totalOperation === 0 || this.state === FIRST_OPERATION
      ? value
      : this.totalOperation + value;
  }

  reset() {
    this.totalOperation = 0;
    this.state = FIRST_OPERATION;
  }

  get total() {
    return this.totalOperation;
  }
}

```

```js
// imports

import * as mathjs from 'mathjs';
import { NUMERIC, SYMBOL } from '../utils/ValueTypes';
import {
  IN_PROGRESS_OPERATION,
  FIRST_OPERATION
} from '../utils/CalculatorStates';
```

## Presenter

Here we store all the objects injected in variables, and render the React component injected.

In our `Presenter` we are injecting the model and the view to have complete controls on them.

```js
// src/CalculatorMVP/presenter/CalculatorPresenter.js

constructor() {
  return {
    init: ::this.initialize
  };
}

initialize(model, view) {
  this.model = model;
  this.view = view;
  this.cont = document.getElementById('calcMVP');

  this.renderView();
}
```

We call the method `renderView` that is used to trigger communication to a React component. This communiation is simple, it is calls for a render because the model changed and the UI should be updated.

```js
renderView() {
  // src/CalculatorMVP/presenter/CalculatorPresenter.js

  const component = React.createElement(this.view, {
    result: this.model.total,
    onBtnClicked: ::this.onBtnClicked
  });

  ReactDOM.render(component, this.cont);
}
```

The `Presenter` can capture the user's interaction. This method identifies and matches the user's button selections. Once matched, the method calls the correct method exposed inside the main model. `reset`, `calculate`, `addValue` are these methods. Once this specific method is called, we then call for the view to be rendered.

```js
// src/CalculatorMVP/presenter/CalculatorPresenter.js

onBtnClicked(value) {
  switch (value) {
    case 'AC':
      this.model.reset();
      break;
    case '=':
      this.model.calculate(value);
      break;
    case '+':
    case '-':
    case '/':
    case '*':
    case '.':
      this.model.addValue(value, SYMBOL);
      break;
    default:
      this.model.addValue(value, NUMERIC);
      break;
  }

  this.renderView();
}
```

## View

All the methods defined in the React component are for rendering purposes.
Responsibilities such as rendering the correct button or display. The `Presenter` passes a method `this.props.onBtnClicked`.

```js
// src/CalculatorMVP/view/Calculator.jsx

export default class Calculator extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.btnClicked = this.props.onBtnClicked;
  }

  onButtonClicked(evt) {
    evt.preventDefault();
    this.btnClicked(evt.target.innerHTML);
  }

  createRow(id, ...labels) {
    let items = labels.map((value, index) => {
      return (
        <li
          key={`${id}_${index}`}
          style={value === 'AC' ? acStyle : btnStyle}
          onClick={::this.onButtonClicked}
        >
          {value}
        </li>
      );
    });

    return (
      <ul key={id} style={ulStyle}>
        {items}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <div style={displayStyle}>{this.props.result}</div>
        {this.createRow('row1', 'AC')}
        {this.createRow('row2', '7', '8', '9', '/')}
        {this.createRow('row3', '4', '5', '6', '*')}
        {this.createRow('row4', '1', '2', '3', '-')}
        {this.createRow('row5', '0', '.', '=', '+')}
      </div>
    );
  }
}
```
