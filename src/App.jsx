import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import React, { useState, useEffect } from 'react';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todoList, setTodoList] = useState(() => {
    // Initialize todoList state by reading from localStorage
    const savedTodoList = localStorage.getItem("savedTodoList");
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });

  const addTodo = (newTodo) => {
    setTodoList(prevTodoList => [...prevTodoList, newTodo]);
  };

  useEffect(() => {
    // This effect will run whenever todoList changes
    // You can perform any side effects related to todoList here
    localStorage.setItem("savedTodoList", JSON.stringify(todoList)); // Save todoList to localStorage
  }, [todoList]); // Adding todoList as a dependency

  return (
    <div>
      <h1> Todo List </h1>
      <AddTodoForm onAddTodo={addTodo}/> 
      <TodoList todoList={todoList}/>
    </div>
  )
}

export default App;
