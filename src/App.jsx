import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("savedTodoList");
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer patnzp39me3fiKE1T.04efea600227fdd40de5b5246b29a0a1d9ffb27f2f42211aba6a8ee8c518aad2`
        }
      };
  
      // URL with view and sorting query parameters
      const url = `https://api.airtable.com/v0/appMHcdE4mK1KyPJz/Default?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`;
  
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const data = await response.json();
  
        // Sort the records based on the Title field with the specified criteria
        data.records.sort((objectA, objectB) => {
          const titleA = objectA.fields.Title.toUpperCase(); // Ignore case for Title A
          const titleB = objectB.fields.Title.toUpperCase(); // Ignore case for Title B
  
          if (titleA < titleB) {
            return 1; // Title A is less than Title B
          }
          if (titleA > titleB) {
            return -1; // Title A is greater than Title B
          }
          return 0; // Titles are equal
        });
  
        // Map the sorted records to the todos array
        const todos = data.records.map(record => ({
          id: record.id,
          title: record.fields.Title
        }));
  
        // Update state with the sorted todos and set loading to false
        setTodoList(todos);
        setIsLoading(false);
      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error fetching data:', error.message);
        setIsLoading(false);
      }
    };
  
    // Fetch data when the component mounts
    fetchData();
  }, []);
  
  
  const addTodo = async (newTodoTitle) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer patnzp39me3fiKE1T.04efea600227fdd40de5b5246b29a0a1d9ffb27f2f42211aba6a8ee8c518aad2`
        },
        body: JSON.stringify({ fields: { Title: newTodoTitle.title } })
      };
      const url = `https://api.airtable.com/v0/appMHcdE4mK1KyPJz/Default`;

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const newTodo = await response.json();
      setTodoList(prevTodoList => [...prevTodoList, { id: newTodo.id, title: newTodo.fields.Title }]);
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };

  const removeTodo = async (id) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer patnzp39me3fiKE1T.04efea600227fdd40de5b5246b29a0a1d9ffb27f2f42211aba6a8ee8c518aad2`
        },
        // body: JSON.stringify({ records: [{id, deleted:true}] })
      };
      const url = `https://api.airtable.com/v0/appMHcdE4mK1KyPJz/Default?records[]=` + id;

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    setTodoList(prevTodoList => prevTodoList.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deliting todo:', error.message);
    }
  };

  return (
    <BrowserRouter>
      <div style={{backgroundColor:'#000000'}}>
        <h1>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo}/> 
        <Routes>
          <Route path="/" element={<TodoList todoList={todoList} onRemoveTodo={removeTodo} />} />
          <Route path="/new" element={<h1>New Todo List</h1>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
 