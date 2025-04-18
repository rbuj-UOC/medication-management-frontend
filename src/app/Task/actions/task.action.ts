import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { TaskDTO } from '../models/task.dto';

export const deleteTask = createAction(
  '[TaskList Page] Delete Task',
  props<{ id: string }>()
);
export const deleteTaskSuccess = createAction(
  '[TaskList Page] Delete Task Success',
  props<{ id: string }>()
);
export const deleteTaskFailure = createAction(
  '[TaskList Page] Delete Task Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getTasks = createAction('[TaskList Page] Get Task List');
export const getTasksSuccess = createAction(
  '[TaskList Page] Get Task List Success',
  props<{ tasks: TaskDTO[] }>()
);
export const getTasksFailure = createAction(
  '[TaskList Page] Get Task List Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const logout = createAction('[Task Service] Logout');
