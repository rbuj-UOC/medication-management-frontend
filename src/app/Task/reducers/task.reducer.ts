import { Action, createReducer, on } from '@ngrx/store';
import { getTasks, getTasksFailure, getTasksSuccess, logout } from '../actions';
import { TaskDTO } from '../models/task.dto';

export interface TaskState {
  tasks: TaskDTO[];
  task: TaskDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: TaskState = {
  tasks: new Array<TaskDTO>(),
  task: new TaskDTO('', ''),
  loading: false,
  loaded: false,
  error: null
};

const _taskReducer = createReducer(
  initialState,
  on(getTasks, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(getTasksSuccess, (state, action) => ({
    ...state,
    tasks: action.tasks,
    loading: false,
    loaded: true,
    error: null
  })),
  on(getTasksFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(logout, () => initialState)
);

export function taskReducer(
  state: TaskState | undefined,
  action: Action
): TaskState {
  return _taskReducer(state, action);
}
