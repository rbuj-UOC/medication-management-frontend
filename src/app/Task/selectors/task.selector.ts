import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from '../reducers';

const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTasks = createSelector(selectTaskState, (state) => {
  return state.tasks;
});
