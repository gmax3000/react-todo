import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import React, { useState } from 'react';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const addTodo = (newTodo) => {
    setTodoList(prevTodoList => [...prevTodoList, newTodo]);
  };

  return (
    <div>
      <h1> Todo List </h1>
      <AddTodoForm onAddTodo={addTodo}/> 
      <TodoList todoList={todoList}/>
    </div>
  )
}

export default App
