import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { toast } from 'react-toastify';

import { Todo } from 'interfaces';
import API from 'services';
import { reorder } from 'utils';

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
    const editedTodo = todos.get(id);
    if (editedTodo !== undefined) {
      editedTodo.title = title;
      editedTodo.completed = completed;
      const updatedTodo = await API.updateTodo(editedTodo);

      handleUpdate((s) => {
        s.set(updatedTodo.id, updatedTodo);
        return new Map(s);
      });
    }
    setInEdit(undefined);
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await API.deleteTodo(id);
      handleUpdate((s) => {
        s.delete(id);
        return new Map(s);
      });
    } catch (e) {
      toast.error('Failed to remove todo');
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (result.destination === undefined) {
      return;
    }

    const items = reorder(todos, result.source.index, result.destination.index);
    handleUpdate(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            data-cy="todos"
          >
            {Array.from(todos).map(([id, todo], index) => (
              <Draggable key={id} draggableId={id.toString()} index={index}>
                {(DraggableProvided) => (
                  <Task
                    key={id}
                    item={todo}
                    inEdit={inEdit}
                    setInEdit={setInEdit}
                    handleSave={handleUpdateTodo}
                    provided={DraggableProvided}
                    handleDelete={handleDelete}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Tasks;
