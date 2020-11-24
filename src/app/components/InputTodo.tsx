import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

interface Props {
  setTodo: (value: string) => void;
}

const InputTodo: React.FC<Props> = (props) => {
  const { setTodo } = props;
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <TextField
        label="Input Todo"
        multiline
        rowsMax={5}
        value={inputValue}
        onChange={handleChange}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          setTodo(inputValue);
        }}
      >
        Add
      </Button>
    </>
  );
};

export default InputTodo;
