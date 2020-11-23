import React from 'react';

import styled from 'styled-components';

import { Checkbox, Typography } from '@material-ui/core';

import { Todo } from '../../interfaces';

const TodoLayout = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 0.3rem 0 0.3rem 1rem;
  &:nth-child(even) {
    background-color: #dddddd;
  }
`;

interface Props {
  todos: Todo[];
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: () => void;
}

const Tasks: React.FC<Props> = (props) => {
  const { todos, handleCheck, handleUpdate } = props;

  return (
    <div>
      {todos.map(({ title, completed }) => (
        <TodoLayout>
          <Typography>{title}</Typography>
          <Checkbox
            checked={completed}
            onChange={handleCheck}
            color="primary"
            aria-label={`${title} checkbox`}
          />
        </TodoLayout>
      ))}
    </div>
  );
};

export default Tasks;
