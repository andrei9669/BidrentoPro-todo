import React, { useState } from 'react';

import { Todo } from 'interfaces';
import API from 'services';

import Task from './Task';

interface Props {
  todos: Map<string | number, Todo>;
  handleUpdate: React.Dispatch<
    React.SetStateAction<Map<string | number, Todo>>
  >;
}

const Tasks: React.FC<Props> = (props) => {
  const { todos, handleUpdate } = props;
  const [inEdit, setInEdit] = useState<number>();

  const handleUpdateTodo = async ({ title, id, completed }: Todo) => {
    const updatedTodo = await API.updateTodo({
      title,
      id,
      completed,
    });

    handleUpdate((s) => {
      s.set(updatedTodo.id, updatedTodo);

      return new Map(s);
    });
  };

  const handleSave = async (title: string, id: number, completed: boolean) => {
    const editedTodo = todos.get(id);
    if (editedTodo !== undefined) {
      editedTodo.title = title;
      editedTodo.completed = completed;
      await handleUpdateTodo(editedTodo);
    }
    setInEdit(undefined);
  };

  return (
    <div>
      {Array.from(todos).map(([id, todo]) => (
        <Task
          key={id}
          item={todo}
          inEdit={inEdit}
          setInEdit={setInEdit}
          handleSave={handleSave}
        />
      ))}
    </div>
  );
};

export default Tasks;
