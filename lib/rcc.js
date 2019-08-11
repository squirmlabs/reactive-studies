import React, { Component } from 'react';
class App extends Component {
  initialState = {
    title: '',
    available: false
  };

  state = initialState;

  updateBook = book => {
    this.setState({ title: book.title, available: book.available });
  };
}
