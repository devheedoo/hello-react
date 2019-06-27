import React, { Component } from 'react';

const Problematic = () => {
  throw (new Error('Bug Occurs!'));
  return (
    <div></div>
  )
}

class Counter extends Component {
  state = {
    number: 0
  }

  constructor(props) {
    super(props);
    console.log('constructor');
  }

  /* 정리하면 Mount - Update - Unmount */

  componentWillMount() {
    console.log('componentWillMount (deprecated)');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 5의 배수라면 리렌더링하지 않음
    console.log('shouldComponentUpdate');
    if (nextState.number % 5 === 0) return false;
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }

  handleIncrease = () => {
    this.setState({
      number: this.state.number + 1
    });
  }

  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1
    });
  }

  componentDidCatch(error, info) {
    this.setState({
      error: true
    });
  }

  render() {
    if (this.state.error) return (<h1>Error Occurs!</h1>);
    return (
      <div>
        <h1>Counter</h1>
        <div>value: {this.state.number}</div>
        { this.state.number === 4 && <Problematic />}
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;