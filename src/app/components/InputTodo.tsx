import React, { useState } from 'react';

import { Todo } from '../../interfaces';

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const InputTodo: React.FC<Props> = (props) => {
  const [inputValue, setInputValue] = useState('');

  return <div />;
};

export default InputTodo;
