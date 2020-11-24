import { Todo } from 'interfaces';

export const todoToMap = (todos: Todo[]): Map<number, Todo> => {
  const map = new Map();
  todos.forEach((el) => {
    map.set(el.id, el);
  });
  return map;
};
