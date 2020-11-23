import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Paper } from '@material-ui/core';

import API from '../services';
import { Todo } from '../interfaces';

import Tasks from './components/Tasks';

const Layout = styled(Paper)`
  width: 50%;
  height: 50%;
  margin: auto;
  display: grid;
  grid-template-areas: 'input-todo' 'totods';
`;
const InputTodo = styled.div``;

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      const data = await API.getAllTodos();
      setTodos(data);
    })();
  }, []);

  return (
    <Layout>
      <InputTodo />
      <Tasks todos={todos} />
    </Layout>
  );
};

export default App;
