import React from 'react';
import * as style from './TodoListItem.module.css';

function TodoListItem({ todo, onRemoveTodo }) {
  const handleRemoveClick = () => {
    onRemoveTodo(todo.id);
  };
 console.log(todo);
  return (
    <li className={style.ListItem}>
      {todo.title}
      <button type="button" onClick={handleRemoveClick}>Remove</button>
    </li>
  );
}

export default TodoListItem;


// {
//   "records": [
//       {
//           "id": "recEw28dNHMtYp4Md",
//           "createdTime": "2024-04-30T06:49:09.000Z",
//           "fields": {
//               "Title": "Watch video",
//               "CompletedAt": "2024-05-02"
//           }
//       },
//       {
//           "id": "recKDSO5I4L9sO6TT",
//           "createdTime": "2024-04-30T06:49:09.000Z",
//           "fields": {
//               "Title": "Submit assesment"
//           }
//       },
//       {
//           "id": "reckeKBL14xAlO3c4",
//           "createdTime": "2024-04-30T06:49:09.000Z",
//           "fields": {
//               "Title": "complete lesson"
//           }
//       }
//   ]
// }