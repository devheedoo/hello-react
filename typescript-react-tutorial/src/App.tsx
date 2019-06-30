import * as React from 'react';
import Profile from './components/Profile';
import Counter from './components/Counter';
import TodoList from './components/TodoList';

class App extends React.Component {
  render() {
    return (
      <div>
        <Profile
          name="Heedo Kim"
          job="Web Developer"
        />
        <Counter />
        <TodoList />
      </div>
    );
  }
}

export default App;