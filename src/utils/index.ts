import { useEffect, useRef } from 'react';

import { Todo } from 'interfaces';

export const todoToMap = (todos: Todo[]): Map<number, Todo> => {
  const map = new Map();
  todos.forEach((el) => {
    map.set(el.id, el);
  });
  return map;
};

export const usePrevious = <T>(value: T): T => {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
