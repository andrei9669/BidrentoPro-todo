import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled, { css, keyframes } from 'styled-components';

interface Props {
  setTodo: (value: string) => void;
}

const errorTransition = keyframes`
  25% {
    transform: translateX(-2%);
  }
  50% {
    transform: translateX(2%);
  }
  75% {
    transform: translateX(-2%);
  }
  100% {
    transform: translateX(0);
  }
`;

const ANIMATION_DURATION = 700;
const StyledTextField = styled(TextField)<{
  error_animation: string;
}>`
  ${({ error_animation }) =>
    error_animation === 'true' &&
    css`
      animation: ${errorTransition} ${ANIMATION_DURATION}ms linear 1;
    `}
`;

const StyleForm = styled.form`
  display: grid;
  gap: 1rem;
`;

const InputTodo: React.FC<Props> = (props) => {
  const { setTodo } = props;
  const [inputValue, setInputValue] = useState<string>('');
  const [errorAnimation, setErrorAnimation] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    setInputValue(v);
    setErrorAnimation(false);
    setError(v === '');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue !== '') {
      setTodo(inputValue);
      setInputValue('');
    } else {
      setErrorAnimation(true);
      setError(true);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorAnimation(false);
      setError(false);
    }, ANIMATION_DURATION);

    return () => {
      clearTimeout(timeout);
    };
  }, [errorAnimation]);

  return (
    <StyleForm onSubmit={handleSubmit}>
      <StyledTextField
        inputProps={{ 'data-cy': 'todo-input' }}
        autoFocus
        label="Add Todo"
        rowsMax={5}
        value={inputValue}
        error={error}
        error_animation={errorAnimation.toString()}
        onChange={handleChange}
      />
      <Button type="submit" color="primary" variant="contained">
        Add
      </Button>
    </StyleForm>
  );
};

export default InputTodo;
