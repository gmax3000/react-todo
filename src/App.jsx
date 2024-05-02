import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import React, { useState, useEffect } from 'react';

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
          title: record.fields.title
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
        body: JSON.stringify({ fields: { title: newTodoTitle } })
      };
      const url = `https://api.airtable.com/v0/appMHcdE4mK1KyPJz/Default`;

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const newTodo = await response.json();
      setTodoList(prevTodoList => [...prevTodoList, { id: newTodo.id, title: newTodo.fields.title }]);
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };

  const removeTodo = (id) => {
    setTodoList(prevTodoList => prevTodoList.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/> 
      {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>}
    </div>
  );
}

export default App;
