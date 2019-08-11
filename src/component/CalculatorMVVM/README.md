# MVVM

This architecture usea a `View-Model` instead of a `Presenter`. 
This object will be the bridge between the data stored inside a model and the view.

The `View-Model` is responsible for preparing the shape that matches the view's contract. It is also responsible for making the data available from the `Model` to the `View`. The logic of the view-model is tightly coupled with rendering the `View`.

An real world example could be that we have Record values stored in the model with U.S. currency. A view requires the Record value to display in euro.

In MVVM the model stores the raw data, and the `View-Model` would be responsible for converting the record to the required format.

The `View-Model` has a relationship with the views that is 1 to many.

The communication of the `View-Model` and the `view` tend to happen via bindings. To keep the application in sync, every time a `record` is updated on the `view` or in the `View-Model`, the change is communicated to other objects.

With MVP we enforce complete separation between the `model` and the `view`. In `MVVM` this enforcement doesn’t change.

The `model` is simple. We store `records` in a `raw format`. We also avoid keeping the `state` in the `model`. We instead, move this data to the `view-model`. If the component is small enough, we may just move this data to the `view`.

## Initialize

The App.js file is instantiating all the objects for an `MVVM` architecture: `model`, `view-model`, and `view`.

In the `view-model` constructor we inject the `model` and `view`. This way the records will be retrievable data from the `model`. So that can serve the view with
the correct `record` to display.

```js
// src/App/App.js

constructor() {
  const model = new CalculatorModel();
  const emitter = new LiteEventEmitter();
  const vm = new CalculatorViewModel(model, emitter);
  const cont = document.getElementById("app");
  ReactDOM.render(<Calculator emitter={emitter}
  initValue={model.total} />, cont);
}
```

## View

The View is a React component that has two key concepts: 

- dispatching the data from the `view` to the `view-model`
- retrieving the data from the `view-model`.

Data binding libraries or events are acceptable within MVVM architecture.

We will inject an event emitter when the `view` and the `view-model` were instantiated.
This will open a channel of communication between the two objects.

```js
// src/component/CalculatorMVVM/view/Calculator.jsx

constructor(props) {
  super(props);
  this.emitter = this.props.emitter;
}

state = { displayValue: this.props.initValue };

componentDidMount() {
  this.emitter.on('UpdateDisplayValue', value =>
    this.setState({ displayValue: value })
  );
}

onButtonClicked(evt) {
  evt.preventDefault();
  this.manageDisplayState(evt.target.innerHTML);
}

manageDisplayState(value) {
  switch (value) {
    case 'AC':
      this.emitter.emit('ResetEvent');
      break;
    case '=':
      this.emitter.emit('CalculateEvent');
      break;
    case '+':
    case '-':
    case '/':
    case '*':
    case '.':
      this.emitter.emit('AddValueEvent', { value: value, type: SYMBOL });
      break;
    default:
      this.emitter.emit('AddValueEvent', { value: value, type: NUMERIC });
      break;
  }
}
```

Method `manageDisplayState` has all the events used to communicate to the `view-model`.

In `componentDidMount` we need one event to listen for, so that we can update the calculator display.

## View-Model

The `view-model` is responsible for update and retrieval of records stored in the
`model`.

We listen for all the events emitted by the `view` and `dispatch` the `event` for updating the view’s display every time the record changes.

```js
// src/component/CalculatorMVVM/viewmodel/CalculatorViewModel.js

initialize() {
  this.emitter.on("CalculateEvent", _ => {
    this.calculate();
  });

  this.emitter.on("AddValueEvent", content => {
    this.addValue(content.value, content.type);
  });

  this.emitter.on("ResetEvent", _ => {
    this.reset();
  });
}

updateDisplayAndState(state){
  this.state = state;
  this.emitter.emit("UpdateDisplayValue", this.model.total);
}

```


Every time there is a user button click in our view we are going to update the value in the `model`. Then we call the `updateDisplayAndState` method for dispatching this change to the view.

Internal state is kept in the `view-model` so that we can match the right method per calculation. We update when the internal state is changed.

All methods have two main responsibilities:
- Model updating
- Dispatch records to the view 

Majority of application business logic is present in the `view-model`.

This allows us to maintain the binding contract of the event between the `view` and the `view-model`. 

This is slightly more tightly coupled compared to the relationships in the `MVP` architecture.

```js
// src/component/CalculatorMVVM/model/CalculatorViewModel.js

initialize() {
  this.emitter.on("CalculateEvent", _ => {
    this.calculate();
  });

  this.emitter.on("AddValueEvent", content => {
    this.addValue(content.value, content.type);
  });

  this.emitter.on("ResetEvent", _ => {
    this.reset();
  });
}

updateDisplayAndState(state){
  this.state = state;
  this.emitter.emit("UpdateDisplayValue", this.model.total);
}

```

## Model

The `model` exposes a few methods in order to update the value to display; it doesn’t have any data manipulation or any state, and in this case the model is just a data representation of the main application so if we need to use it in combination with another view-model, the model will provide the data expected and nothing more.

```js
export default class CalculatorModel {
  constructor() {
    this.totalOperation = 0;
  }

  calculate(operation) {
    this.totalOperation = mathjs.evaluate(this.totalOperation);
  }

  add(value) {
    this.totalOperation = value;
  }

  reset() {
    this.totalOperation = 0;
  }

  get total() {
    return this.totalOperation;
  }
}

```
