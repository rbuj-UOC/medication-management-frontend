import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from '../reducers';

const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTaskStateLoading = createSelector(
  selectTaskState,
  (state) => {
    return state.loading;
  }
);

export const selectTasks = createSelector(selectTaskState, (state) => {
  return state.tasks;
});
