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

const InputTodo: React.FC<Props> = (props) => {
  const { setTodo } = props;
  const [inputValue, setInputValue] = useState<string>();
  const [errorAnimation, setErrorAnimation] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setErrorAnimation(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorAnimation(false);
    }, ANIMATION_DURATION);
    return () => {
      clearTimeout(timeout);
    };
  }, [errorAnimation]);

  return (
    <>
      <StyledTextField
        label="Add Todo"
        multiline
        rowsMax={5}
        value={inputValue}
        error={inputValue === ''}
        error_animation={errorAnimation.toString()}
        onChange={handleChange}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          if (typeof inputValue === 'string' && inputValue !== '') {
            setTodo(inputValue);
          } else {
            setErrorAnimation(true);
          }
        }}
      >
        Add
      </Button>
    </>
  );
};

export default InputTodo;
