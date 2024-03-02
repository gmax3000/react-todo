
const todoList = [
  { ID: 1, title: 'Watch video' },
  { ID: 2, title: 'Complete assignment' },
  { ID: 3, title: 'Push code' }
];

function TodoList() {

  return (
    <>
      <ul>
      {todoList.map(todo => (
          <li key={todo.ID}>{todo.title}</li>
        ))}
      </ul>
    </>
  )
}

export default TodoList