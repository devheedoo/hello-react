import * as React from 'react';
import TodoItem from './TodoItem';

interface Props {

}

interface TodoItemData {
  id: number;
  text: string;
  done: boolean;
}

interface State {
  todoItems: TodoItemData[];
  todoInput: string;
}

class TodoList extends React.Component<Props, State> {
  id: number = 0;

  state: State = {
    todoItems: [],
    todoInput: ''
  }

  onToggleTodoList = (id: number): void => {
    const { todoItems } = this.state;
    const index = todoItems.findIndex(todo => todo.id === id);
    const selectedItem = todoItems[index];
    const nextItems = [ ...todoItems ]; // 일단 복사한 상태로 초기화

    const nextItem = {
      ...selectedItem,
      done: !selectedItem.done  // ??
    };

    nextItems[index] = nextItem;

    this.setState({
      todoItems: nextItems
    });
  }

  onRemoveTodoList = (id: number): void => {
    this.setState(
      ({ todoItems }) => ({
        todoItems: todoItems.filter(todo => todo.id !== id)
      })
    );
  }

  onChangeTodoList = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({
      todoInput: value
    });
  }

  onSubmitTodoList = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState(
      ({ todoItems, todoInput}) => ({
        todoInput: '',
        todoItems: todoItems.concat({
          id: this.id++,
          text: todoInput,
          done: false
        })
      })
    );
  }

  render() {
    const { onChangeTodoList, onRemoveTodoList, onSubmitTodoList, onToggleTodoList } = this;
    const { todoInput, todoItems } = this.state;

    const todoItemList = todoItems.map(
      todo => (
        <TodoItem
          key={todo.id}
          done={todo.done}
          onToggleTodoItem={() => onToggleTodoList(todo.id)}
          onRemoveTodoItem={() => onRemoveTodoList(todo.id)}
          text={todo.text}
        />
      )
    );

    return (
      <div>
        <h1>TODOLIST</h1>
        <form onSubmit={onSubmitTodoList}>
          <input onChange={onChangeTodoList} value={todoInput} />
          <button type="submit">Add</button>
        </form>
        <ul>
          {todoItemList}
        </ul>
      </div>
    );
  }
}

export default TodoList;