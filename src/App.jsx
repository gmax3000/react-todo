import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import React, { useState, useEffect } from 'react';

const useSemiPersistentState = () => {
  const [todoList, setTodoList] = useState(() => {
    // Initialize todoList state by reading from localStorage
    const savedTodoList = localStorage.getItem("savedTodoList");
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });
  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList)); // Save todoList to localStorage
  }, [todoList]); // Adding todoList as a dependency

  return [todoList, setTodoList]

};

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();
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

export default App;
