
function AddTodoForm(props) {
    
  const  handleAddTodo = (event)=>{

    event.preventDefault(); 
    const todoTitle = event.target.elements.title.value;
    
    console.log('Todo title:', todoTitle);
    console.log('Form submitted!');
    props.onAddTodo(todoTitle); 
    event.target.reset();
  }

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input type="text" name="title" id="todoTitle" placeholder="Enter your todo" />
            <button type="submit">Add</button>
        </form>
    );
  }
  
  export default AddTodoForm