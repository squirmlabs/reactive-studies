# React + Redux

React and Redux is a combination of libraries that together can resemble a minimal
framework.

## React

React is a library used for DOM manipulation with components as its first class citizen
React only takes care of the view part of an architecture. Its has a really smart algorithm - reconciliation - a diff algorithm used for rendering only the part of the DOM that should change.

"React's key design decision is to make the API seem like it re-renders the whole app on every update. This makes writing applications a lot easier but is also an incredible challenge to make it tractable. This article explains how with powerful heuristics we managed to turn a O(n3 problem into a O(n) one."

React introduced the Virtual DOM. The Virtual DOM is a DOM representation where the reconciliation algorithm operates. React understands what should change and when. This minimizes the changes to the real DOM which in return improves the performance of applications. Finally, we improve the user's experience.

Reconciliation is a key concept for React.
https://react-cn.github.io/react/docs/reconciliation.html

## Redux

Redux is a state container which is not specific to React. Frameworks such as Angular can also use Redux as a state manager. Redux is here to solve the problem we usually have with most applications. It's a state manager.

The Redux paradigm is composed by only three components:
- Actions
- Reducers
- Stores

A simple example shows the base of Redux. We have a single store to control the state, actions to describe the changes we want to make, reducers (services) that know how to mutate the state based on the requested action, and middleware to handle the housekeeping tasks.

What makes Redux special, and sometimes hard to understand, is that reducers never change the
state, since it is immutable.

Instead, the reducers must create a new copy of the the application state, make the needed mutations to the copy, and return the new, modified state to the store.

This approach allows Redux and the view layers to easily do change detection.

It is important to note that the whole application state is kept in a single location, the store. Having a single source of data provides enormous benefits during debugging, serialization, and development, as will become apparent in our solutions.

### Store

Redux only has a single store that holds no logic by itself. The store passes the actions to state-changing functions called reducers. The store is passing to the reducer the current state tree and the action, and it waits until the reducer provides back the new state, then the store will append to the state tree and all the objects that are listening for a change will be notified.

### Actions

Actions are dispatched and handled directly by the store, eliminating the need for a standalone dispatcher. Actions are a plain JavaScript object containing the information about the interactions happening within the application life-cycle.

### Reducer

The Reducer is essentially a service, a pure function that is retrieving information about the current state tree and the action we want to perform. The `Reducer` knows how the state should mutate based on the action dispatched. They are responsible for mutating the application state to the next application state. Pure state mutating functions.

Redux was created on top of three core concepts:

- Singularity: State is represented by a tree defined inside a single object called store.
- Read-only State: the only way to change the state with Redux is via an action.
- Changes are made with pure functions only

### Middleware

Every action will be first passed through a list of middleware. Unlike reducers, middleware can modify, stop, or add more actions. Examples might include: a logging middleware, an authorization middleware that checks if the user has permissions to run the action, or an API middleware that sends something to the server.

### Provider

When starting a Redux project, we first start by creating the store object, then wrap our main React `view` inside Redux's `Provider` object.

```js
const store = createStore(CalculatorReducer);
const container = document.getElementById("calcContainer");
ReactDOM.render(
  <Provider store={store}>
    <CalculatorContainer/>
  </Provider>, container);
```

Once the store is created and associated to a specific reducer (Calculator Reducer), we can wrap our main view (Calculator Container) inside a `Provider` object from the redux library.

`Provider` as an object that receives the store as an input and propagates the data to all the container components. The components inside of the application have access to the store via the `Provider`.

### View

React + Redux distinguish two types of components for us.

- Presentational 
- Container

Presentational components are components responsible for the look and feel of the `view`. Considered to be more or less like the `Passive View`.

Container components are simliar to the `Supervising Controller`. Container components are responsible for the services and logic such as `handling user interactions`, `access to the store`, and `mapping records and values` from the store as `props` to React Components.

