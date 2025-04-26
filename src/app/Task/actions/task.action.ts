import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { TaskDTO } from '../models/task.dto';

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
