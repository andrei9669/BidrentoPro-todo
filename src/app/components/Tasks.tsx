import React from 'react';

import { Todo } from '../../interfaces';

interface Props {
  todos: Todo[];
}

const Tasks: React.FC<Props> = (props) => {
  const { todos } = props;
  return (
    <ul>
      {todos.map((el) => (
        <li>
          <div>{el.title}</div>
          <div>{el.complete}</div>
        </li>
      ))}
    </ul>
  );
};

export default Tasks;
