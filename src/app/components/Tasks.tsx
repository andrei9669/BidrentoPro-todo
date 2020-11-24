import React, { useState } from 'react';

import { Todo } from 'interfaces';
import API from 'services';
import Task from 'app/components/Task';

interface Props {
  todos: Map<string | number, Todo>;
  handleUpdate: React.Dispatch<
    React.SetStateAction<Map<string | number, Todo>>
  >;
}

const Tasks: React.FC<Props> = (props) => {
  const { todos, handleUpdate } = props;
  const [inEdit, setInEdit] = useState<number>();

  const handleCheck = (id: number | string) => {
    handleUpdate((s) => {
      const updateTodo = s.get(id);
      if (updateTodo !== undefined) {
        updateTodo.completed = !updateTodo.completed;
        s.set(id, updateTodo);
      }
      return new Map(s);
    });
  };

  const handleSave = async (title: string) => {
    if (inEdit !== undefined) {
      const editedTodo = todos.get(inEdit);
      if (editedTodo !== undefined) {
        const updatedTodo = await API.updateTodo({ title, id: inEdit });

        handleUpdate((s) => {
          s.set(updatedTodo.id, updatedTodo);

          return new Map(s);
        });
      }
    }
  };

  return (
    <div>
      {Array.from(todos).map(([id, todo]) => (
        <Task
          key={id}
          handleCheck={handleCheck}
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
