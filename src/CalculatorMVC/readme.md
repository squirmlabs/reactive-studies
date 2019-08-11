# MVC Calculator

A simple calculator where every time we are clicking a button, we add the value on the display at the top. 

When the user is going to click the button `=` we will dispay the result.

The controller instantiates the view and the model in the constructor of the react application via dependency injection.

## CalculatorController

```js
initialize() {
  const emitter = this.initEmitter();
  this.model = this.initModel(emitter);
  this.initView(emitter, this.model);
}
```

In this implementation the controller will instantiate the view and the model.
It is injecting an event emitter for communication between objects via events.

This immediately will improve the decoupling of objects. If we want to reuse in the future, we wont need to copy more than the object we are interested in.

In this implementation we are using React to handle the view of the calculator. 

React usually renders the components again when there is a properties udpate. 

Within this implementation, we will use an event bus for notifying the view that a new result should be rendered on the caclulator's display. 
Then the view will retrieve the data from the model, updating with the new string to the display.

In order to do this we need to inject the model and the emitter instance inside the view.

```js
initView(emitter, model) {
  const cont = document.getElementById('app');
  ReactDOM.render(<Calculator emitter={emitter} model={model} />, cont);
}
```

The model allows the controller to call methods every time a button is clicked from the calculator's view, the keyboard.

```js
initEmitter() {
  const emitter = new LiteEventEmitter();
  emitter.on('CalculateEvent', _ => {
    this.model.calculate();
  });

  emitter.on('AddValueEvent', content => {
    this.model.addValue(content.value, content.type);
  });

  emitter.on('ResetEvent', _ => {
    this.model.reset();
  });

  return emitter;
}
```

The Controller, via the emitter object, is listening for any event triggered by the view.

## Calculator.jsx

We will then use the React Component life-cycle methods to store these two objects locally.

Then we will listen for any change from the model.

When a change happens we are going to update the state property inside of the React Component.

The correct value will display on the calculator since we are listening and bound to that state property.

```js
componentWillMount() {
  this.model = this.props.model;
  this.emitter = this.props.emitter;
  this.emitter.on('TotalChanged', _ => this.setState({ displayValue: this.model.total }));
  this.setState({ displayValue: this.model.total });
}
```

Everytime the `displayValue` is updated, it will trigger the render function.

```js
render() {
    return (
      <div>
        <div style={displayStyle}>{this.state.displayValue}</div>
        {this.createRow('row1', 'AC')}
        {this.createRow('row2', '7', '8', '9', '/')}
        {this.createRow('row3', '4', '5', '6', '*')}
        {this.createRow('row4', '1', '2', '3', '-')}
        {this.createRow('row5', '0', '.', '=', '+')}
      </div>
    );
  }
```

## CalculatorModel

Inside the model, we keep the application state. 
Handle what should be displayed in our view and perform calculations.

The Model allows the controller to request of some operations like reset, calculate, or add a new value.


```js
calculate() {
  this.totalOperation = mathjs.evaluate(this.totalOperation);
  this.state = FIRST_OPERATION;
  this.emitter.emit('TotalChanged');
}

addValue(value, type) {
  if (type === NUMERIC) {
    this.totalOperation = this.getValue(value);
  } else if (type === SYMBOL) {
    this.totalOperation = this.checkSymbol(value);
  }

  this.state = IN_PROGRESS_OPERATION;
  this.emitter.emit('TotalChanged');
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
  this.emitter.emit('TotalChanged');
}

get total() {
  return this.totalOperation;
}

```
