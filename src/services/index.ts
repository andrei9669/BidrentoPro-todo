import axios from 'axios';

import { Todo } from '../interfaces';

const API = {
  async getTodosForUser(userId: number): Promise<Todo[]> {
    return axios.get(
      `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
    );
  },
  async getAllTodos(): Promise<Todo[]> {
    return axios.get(`https://jsonplaceholder.typicode.com/todos`);
  },
  async postTodo({ title, userId }: { title: string; userId: string }) {
    return axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      userId,
    });
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
  }) {
    return axios.put('https://jsonplaceholder.typicode.com/todos', {
      id,
      title,
      userId,
    });
  },
};
export default API;
