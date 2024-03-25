import TodoListItem from './TodoListItem'

function TodoList({ todoList }) {
    // const { todoList } = props;
  return (
      <ul>
      {todoList.map(todo => (
        <TodoListItem key={todo.ID} todo={todo} />
        ))}
      </ul>
  )
}

export default TodoList