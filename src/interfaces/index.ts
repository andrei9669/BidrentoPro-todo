import { ALL, DONE, NOT_DONE } from 'utils/constants';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface IFilters {
  titleFilter: string;
  checkedFilter: typeof ALL | typeof DONE | typeof NOT_DONE;
}
