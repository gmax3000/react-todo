import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("savedTodoList");
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer patnzp39me3fiKE1T.04efea600227fdd40de5b5246b29a0a1d9ffb27f2f42211aba6a8ee8c518aad2`
        }
      };
      const url = `https://api.airtable.com/v0/appMHcdE4mK1KyPJz/Default`;

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        const todos = data.records.map(record => ({
          id: record.id,
          title: record.fields.Title
        }));
        setTodoList(todos);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setIsLoading(false);
      }
    };

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

  const removeTodo = (id) => {
    setTodoList(prevTodoList => prevTodoList.filter(todo => todo.id !== id));
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
 