import React, { Component } from 'react';
import MyName from './MyName';
import Counter from './Counter';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MyName name="Heedo Kim" />
        <MyName name="Sorin Choi" />
        <MyName />
        <p></p>
        <Counter />
      </React.Fragment>
    );
  }
}

export default App;
