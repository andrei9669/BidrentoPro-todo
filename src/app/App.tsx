import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Divider, Paper } from '@material-ui/core';

import API from '../services';
import { Todo } from '../interfaces';

import Tasks from './components/Tasks';

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
const InputTodo = styled.div``;

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleUpdate = () => {};
  const handleAdd = () => {};

  useEffect(() => {
    (async () => {
      const data = await API.getAllTodos();
      setTodos(data);
    })();
  }, []);

  return (
    <Layout>
      <InputTodo />
      <Divider />
      <Tasks
        todos={todos}
        handleCheck={handleCheck}
        handleUpdate={handleUpdate}
      />
    </Layout>
  );
};

export default App;
