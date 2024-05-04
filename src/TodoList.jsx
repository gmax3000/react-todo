import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onRemoveTodo }) {
  console.log("todo list"+todoList);
  return (
    <ul>
      {todoList.map(todo => (
        <TodoListItem key={todo.ID} todo={todo} onRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
}

export default TodoList;
