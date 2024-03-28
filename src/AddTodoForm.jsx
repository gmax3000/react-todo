import React, { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const newTodoTitle = todoTitle; // Storing todoTitle in new variable
    const newTodo = {
        title: newTodoTitle,
        id: Date.now() // Generate a unique identifier
      };
      console.log('New Todo:', newTodo); // Access newTodo object
      console.log('Form submitted!');
      onAddTodo(newTodo); // Pass newTodo object
      setTodoTitle(''); // Reset todoTitle state after submission
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input
        type="text"
        name="title"
        id="todoTitle"
        placeholder="Enter your todo"
        value={todoTitle} // Bind input value to todoTitle state
        onChange={handleTitleChange} // Update todoTitle state on input change
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
