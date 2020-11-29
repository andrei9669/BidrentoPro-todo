import { ALL, ACTIVE, COMPLETED } from 'utils/constants';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface IFilters {
  titleFilter: string;
  checkedFilter: typeof ALL | typeof ACTIVE | typeof COMPLETED;
}
