import React, { useEffect, useState } from 'react';
import { Button, Checkbox, TextField, Typography } from '@material-ui/core';
import styled from 'styled-components';

import { Todo } from 'interfaces';

const TodoLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0 0 0 1rem;
  &:nth-child(even) {
    background-color: #dddddd;
  }
`;
const StyledButton = styled(Button)`
  height: 24px;
  margin: 9px;
`;

const StyledTypography = styled(Typography)`
  max-width: 20rem;
  overflow-x: hidden;
`;

interface Props {
  item: Todo;
  inEdit: number | undefined;
  setInEdit: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleSave: (title: string, id: number, completed: boolean) => Promise<void>;
}

const Task: React.FC<Props> = (props) => {
  const {
    item: { id, title, completed },
    inEdit,
    setInEdit,
    handleSave,
  } = props;

  const [value, setValue] = useState(title);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue(title);
  }, [inEdit, title]);

  return (
    <TodoLayout>
      {id === inEdit ? (
        <>
          <TextField
            multiline
            rowsMax={5}
            fullWidth
            value={value}
            error={value === ''}
            onChange={handleChange}
          />
          <StyledButton
            type="submit"
            color="primary"
            variant="contained"
            onClick={async () => {
              if (value !== '') {
                await handleSave(value, id, completed);
              }
            }}
          >
            Save
          </StyledButton>
        </>
      ) : (
        <>
          <StyledTypography display="block" onClick={() => setInEdit(id)}>
            {title}
          </StyledTypography>
          <Checkbox
            checked={completed}
            onChange={() => handleSave(value, id, !completed)}
            color="primary"
            aria-label={`${title} checkbox`}
          />
        </>
      )}
    </TodoLayout>
  );
};

export default Task;
