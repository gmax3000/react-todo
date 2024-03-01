
function AddTodoForm() {

    return (
      <>
        <form>
            <label htmlFor="todoTitle">Title</label>
            <input type="text" id="todoTitle" placeholder="Enter your todo" />
            <button type="submit">Add</button>
        </form>
      </>
    )
  }
  
  export default AddTodoForm