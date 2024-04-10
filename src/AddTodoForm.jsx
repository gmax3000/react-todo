import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      title: todoTitle,
      id: Date.now() // Generate a unique identifier
    };
    console.log('New Todo:', newTodo); // Access newTodo object
    console.log('Form submitted!');
    onAddTodo(newTodo); // Pass newTodo object
    setTodoTitle(''); // Reset todoTitle state after submission
    // event.target.reset();
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        id="todoTitle"
        value={todoTitle}
        onInputChange={handleTitleChange}
        type="text"
        placeholder="Enter your todo"
      >
        Title
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
