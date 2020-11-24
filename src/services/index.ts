import axios from 'axios';

import { Todo } from 'interfaces';
import { todoToMap } from 'utils';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const API = {
  async getTodosForUser(userId: number): Promise<Map<number, Todo>> {
    const urlParams = new URLSearchParams();
    urlParams.set('userId', userId.toString());

    const { data } = await axios.get<Todo[]>(
      `${API_URL}?${urlParams.toString()}`,
    );

    return todoToMap(data);
  },

  async getAllTodos(): Promise<Map<number, Todo>> {
    const { data } = await axios.get<Todo[]>(API_URL);

    return todoToMap(data);
  },

  async postTodo({
    title,
    userId = 1,
  }: {
    title: string;
    userId?: number;
  }): Promise<Todo> {
    return (
      await axios.post<Todo>(API_URL, {
        title,
        userId,
      })
    ).data;
  },

  async updateTodo({
    id,
    title,
  }: {
    id: number;
    title: string;
  }): Promise<Todo> {
    return (
      await axios.put<Todo>(API_URL, {
        id,
        title,
      })
    ).data;
  },
};
export default API;
