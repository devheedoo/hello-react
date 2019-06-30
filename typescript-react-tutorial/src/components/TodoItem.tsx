import * as React from 'react';

interface Props {
  text: string;
  done: boolean;
  onToggleTodoItem(): void;
  onRemoveTodoItem(): void;
}

const TodoItem: React.FunctionComponent<Props> = ({ text, done, onToggleTodoItem, onRemoveTodoItem }) => (
  <li>
    <b
      onClick={onToggleTodoItem}
      style={{
        textDecoration: done ? 'line-through' : 'none',
        color: done ? 'gray' : 'black'
      }}
    >
      {text}
    </b>
    {/* <span style={{marginLeft: '0.5rem'}} onClick={onRemoveTodoItem}>Remove</span> */}
    <button style={{marginLeft: '0.5rem'}} onClick={onRemoveTodoItem}>Remove</button>
  </li>
);

export default TodoItem;