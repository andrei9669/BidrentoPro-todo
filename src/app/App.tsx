import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Divider, Paper } from '@material-ui/core';
import { toast } from 'react-toastify';

import { IFilters, Todo } from 'interfaces';
import API from 'services';
import { ALL, DONE, NOT_DONE } from 'utils/constants';

import { Filters, InputTodo, Tasks } from './components';

const Layout = styled(Paper)`
  width: 25rem;
  height: 50%;
  margin: auto;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  grid-template-rows:
    auto
    auto
    auto
    1fr;
`;

const App: React.FC = () => {
  const [todos, setTodos] = useState<Map<string | number, Todo>>(new Map());
  const [filters, setFilters] = useState<IFilters>({
    titleFilter: '',
    checkedFilter: ALL,
  });

  const handleAdd = async (value: string) => {
    try {
      const newTodo = await API.postTodo({ title: value });
      setTodos((state) => {
        state.set(newTodo.id, newTodo);
        return new Map(state);
      });
    } catch (e) {
      toast.error('Failed to add todo', { toastId: 'add-todo-error' });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await API.getTodosForUser(1);
        setTodos(data);
      } catch (e) {
        toast.error('Could not load todos', { toastId: 'error-message' });
      }
    })();
  }, []);

  const filteredTodos = Array.from(todos).filter(([, todo]) => {
    let show: boolean;
    switch (filters.checkedFilter) {
      case DONE:
        show = todo.completed;
        break;
      case NOT_DONE:
        show = !todo.completed;
        break;
      case ALL:
      default:
        show = true;
        break;
    }
    return todo.title.match(filters.titleFilter) && show;
  });

  return (
    <Layout>
      <Filters filters={filters} setFilters={setFilters} />
      <InputTodo setTodo={handleAdd} />
      <Divider />
      <Tasks todos={new Map(filteredTodos)} handleUpdate={setTodos} />
    </Layout>
  );
};

export default App;
