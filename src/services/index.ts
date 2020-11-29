import axios from 'axios';

import { Todo } from 'interfaces';
import { todoToMap } from 'utils';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

let inMemoryDB: Map<number, Todo> = new Map();
let lastId = 0;

const API = {
  async getTodosForUser(userId: number): Promise<Map<number, Todo>> {
    if (inMemoryDB.size === 0) {
      const urlParams = new URLSearchParams();
      urlParams.set('userId', userId.toString());

      const { data } = await axios.get<Todo[]>(
        `${API_URL}?${urlParams.toString()}`,
      );

      // since the API doesn't really support adding new items, we are going to imitate it
      inMemoryDB = todoToMap(data);
      lastId = Array.from(inMemoryDB.keys()).pop() ?? 0;
    }

    return inMemoryDB;
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
    const { data } = await axios.post<Todo>(API_URL, {
      title,
      userId,
    });
    data.id = ++lastId;
    return data;
  },

  async updateTodo({
    id,
    title,
    completed,
  }: {
    id: number;
    title: string;
    completed: boolean;
  }): Promise<Todo> {
    return (
      await axios.put<Todo>(`${API_URL}/${id}`, {
        id,
        title,
        completed,
      })
    ).data;
  },

  async deleteTodo(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },
};
export default API;
