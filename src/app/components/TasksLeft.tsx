import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import { Todo } from 'interfaces';

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

interface Props {
  todos: Map<string | number, Todo>;
}

const TasksLeft: React.FC<Props> = (props) => {
  const { todos } = props;

  const todosLeft = Array.from(todos).reduce((acc, [, cur]) => {
    return cur.completed ? acc : acc + 1;
  }, 0);

  return (
    <Layout>
      <Typography data-cy="task-count" variant="caption">
        {todosLeft} {todosLeft === 1 ? 'todo' : 'todos'} left
      </Typography>
    </Layout>
  );
};

export default TasksLeft;
