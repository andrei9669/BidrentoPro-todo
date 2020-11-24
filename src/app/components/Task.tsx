import React, { useState } from 'react';
import { Button, Checkbox, TextField, Typography } from '@material-ui/core';
import styled from 'styled-components';

import { Todo } from 'interfaces';

const TodoLayout = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 0 0 0 1rem;
  &:nth-child(even) {
    background-color: #dddddd;
  }
`;
interface Props {
  handleCheck: (id: number) => void;
  item: Todo;
  inEdit: number | undefined;
  setInEdit: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleSave: (title: string) => Promise<void>;
}

const Task: React.FC<Props> = (props) => {
  const {
    handleCheck,
    item: { id, title, completed },
    inEdit,
    setInEdit,
    handleSave,
  } = props;

  const [value, setValue] = useState(title);

  return (
    <TodoLayout>
      {id === inEdit ? (
        <div>
          <TextField value={title} error={false} />
          <Button onClick={() => handleSave(value)}>Save</Button>
        </div>
      ) : (
        <Typography onClick={() => setInEdit(id)}>{title}</Typography>
      )}
      <Checkbox
        checked={completed}
        onChange={() => handleCheck(id)}
        color="primary"
        aria-label={`${title} checkbox`}
      />
    </TodoLayout>
  );
};

export default Task;
