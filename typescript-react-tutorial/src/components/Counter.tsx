import * as React from 'react';

interface Props {

}

interface State {
  counter: number;
}

class Counter extends React.Component<Props, State> {
  state: State = {
    counter: 0
  };

  onIncrementCounter = (): void => {
    this.setState(
      ({ counter }) => ({ counter: counter + 1 })
    );
  }

  onDecrementCounter = (): void => {
    this.setState(
      ({ counter }) => ({ counter: counter - 1})
    );
  }

  render() {
    const { onIncrementCounter, onDecrementCounter } = this;
    return (
      <div>
        <h1>Counter</h1>
        <h2>{this.state.counter}</h2>
        <button onClick={onIncrementCounter}>+</button>
        <button onClick={onDecrementCounter}>-</button>
      </div>
    );
  }
}

export default Counter;