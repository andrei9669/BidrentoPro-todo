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

export const reorder = (
  list: Map<string | number, Todo>,
  startIndex: number,
  endIndex: number,
): Map<string | number, Todo> => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return new Map(result);
};
