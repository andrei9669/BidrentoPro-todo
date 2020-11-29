import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import styled, { css } from 'styled-components';
import { DraggableProvided } from 'react-beautiful-dnd';
import { DeleteForever } from '@material-ui/icons';

import { Todo } from 'interfaces';

const TodoLayout = styled.div<{ 'data-completed': string | undefined }>`
  display: grid;
  grid-template-columns: 1fr auto auto;
  padding: 0 0 0 1rem;

  border-bottom: 2px solid #b1b1b1;

  ${({ 'data-completed': completed }) =>
    completed === 'true' &&
    css`
      text-decoration: black line-through;
      color: grey;
    `}
`;
const StyledButton = styled(Button)`
  height: 24px;
  margin: 9px;
`;

const StyledTypography = styled(Typography)`
  max-width: 20rem;
  overflow-x: hidden;
  min-height: 50px;
`;

const StyledIconButton = styled(IconButton)<{ 'show-delete': boolean }>`
  transition: max-width linear 300ms, width linear 300ms, margin linear 300ms,
    padding linear 300ms, opacity linear 300ms;
  overflow: hidden;
  ${({ 'show-delete': showDelete }) =>
    !showDelete &&
    css`
      max-width: 0;
      width: 0;
      opacity: 0;
      padding: 0;
      margin: 0;
    `}
`;

interface Props {
  provided: DraggableProvided;
  item: Todo;
  inEdit: number | undefined;
  setInEdit: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleSave: (title: string, id: number, completed: boolean) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
}

const Task: React.FC<Props> = (props) => {
  const {
    item: { id, title, completed },
    inEdit,
    setInEdit,
    handleSave,
    provided,
    handleDelete,
  } = props;

  const [value, setValue] = useState(title);
  const [showDelete, setShowDelete] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue(title);
  }, [inEdit, title]);

  const completedVal = completed ? 'true' : undefined;

  return (
    <TodoLayout
      data-completed={id === inEdit ? undefined : completedVal}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
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
          <StyledIconButton
            data-cy="delete"
            color="secondary"
            show-delete={showDelete}
            aria-label="delete"
            onClick={() => handleDelete(id)}
          >
            <DeleteForever />
          </StyledIconButton>
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
