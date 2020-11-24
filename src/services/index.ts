import axios from 'axios';

import { Todo } from '../interfaces';

const API = {
  async getTodosForUser(userId: number): Promise<Todo[]> {
    return (
      await axios.get<Todo[]>(
        `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
      )
    ).data;
  },
  async getAllTodos(): Promise<Todo[]> {
    return (
      await axios.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos`)
    ).data;
  },
  async postTodo({
    title,
    userId = '0',
  }: {
    title: string;
    userId?: string;
  }): Promise<Todo> {
    return (
      await axios.post<Todo>('https://jsonplaceholder.typicode.com/todos', {
        title,
        userId,
      })
    ).data;
  },
  async updateTodo({
    id,
    title,
    userId,
  }: {
    id: number;
    title: string;
    body: string;
    userId: number;
  }): Promise<Todo> {
    return (
      await axios.put<Todo>('https://jsonplaceholder.typicode.com/todos', {
        id,
        title,
        userId,
      })
    ).data;
  },
};
export default API;
