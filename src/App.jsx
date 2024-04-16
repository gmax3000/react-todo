import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import React, { useState, useEffect } from 'react';

function App() {
  const [todoList, setTodoList] = useState(() => {
    // Initialize todoList state by reading from localStorage
    const savedTodoList = localStorage.getItem("savedTodoList");
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });
  
  // Define isLoading state
  const [isLoading, setIsLoading] = useState(true);

  // Effect to save todoList to localStorage
  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList)); // Save todoList to localStorage
  }, [todoList]); // Adding todoList as a dependency

  // Effect with an empty dependency list
  useEffect(() => {

      // Check if isLoading is false before setting localStorage
  if (!isLoading) {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList)); // Save todoList to localStorage
  }
    // This effect will run once after the component mounts
    console.log('This effect runs once after the component mounts');
    
    // Define a new Promise
    const promise = new Promise((resolve, reject) => {
      // Perform async operation here...
      // For example, simulate a delay using setTimeout
      setTimeout(() => {
        // Simulate successful completion
        resolve({ data: { todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [] } }); // Pass an Object with property data as a nested object containing todoList
      }, 2000); // Simulate a 2-second delay
    });

// Chain a then method to the Promise and pass it a function with parameter result
promise.then((result) => {
  console.log('Promise resolved:', result);
  // Update the list using the state setter and pass the todoList from the result object
  setTodoList(result.data.todoList);
  // Set isLoading to false after data loading
  setIsLoading(false);
  // Save todoList to localStorage
  localStorage.setItem("savedTodoList", JSON.stringify(result.data.todoList));
}).catch((error) => {
  console.error('Promise rejected:', error);
  // Set isLoading to false if an error occurs
  setIsLoading(false);
});



    // Cleanup function
    return () => {
      console.log('Cleanup function runs when the component unmounts');
    };
  }, []); // Empty dependency list

  const addTodo = (newTodo) => {
    setTodoList(prevTodoList => [...prevTodoList, newTodo]);
  };

  const removeTodo = (id) => {
    setTodoList(prevTodoList => prevTodoList.filter(todo => todo.id !== id));
  };
  return (
    <div>
      <h1> Todo List </h1>
      <AddTodoForm onAddTodo={addTodo}/> 
      {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>}
    </div>
  )
  
  
}

export default App;
