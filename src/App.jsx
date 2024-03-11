import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import React, { useState } from 'react';

function App() {
  const [newTodo, setNewTodo] = useState('');

  return (
    <div>
      <h1> Todo List </h1>
      <AddTodoForm onAddTodo={setNewTodo}/> 
      <p>New Todo: {newTodo}</p> 
      <TodoList/>  
    </div>
  )
}

export default App
