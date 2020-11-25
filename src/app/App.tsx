import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Divider, Paper } from '@material-ui/core';

import { Todo } from 'interfaces';
import API from 'services';

import Tasks from './components/Tasks';
import InputTodo from './components/InputTodo';

const Layout = styled(Paper)`
  width: 25rem;
  height: 50%;
  margin: auto;
  display: grid;
  gap: 1rem;
  grid-template-areas:
    'input-todo'
    'totods';
  grid-template-rows:
    auto
    1fr;
`;

const App: React.FC = () => {
  const [todos, setTodos] = useState<Map<string | number, Todo>>(new Map());

  const handleAdd = async (value: string) => {
    const newTodo = await API.postTodo({ title: value });
    setTodos((state) => {
      state.set(newTodo.id, newTodo);
      return new Map(state);
    });
  };

  useEffect(() => {
    (async () => {
      const data = await API.getTodosForUser(1);
      setTodos(data);
    })();
  }, []);

  return (
    <Layout>
      <InputTodo setTodo={handleAdd} />
      <Divider />
      <Tasks todos={todos} handleUpdate={setTodos} />
    </Layout>
  );
};

export default App;
