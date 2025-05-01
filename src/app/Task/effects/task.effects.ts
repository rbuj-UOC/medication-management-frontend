import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../../Auth/services/auth.service';
import { SharedService } from '../../Shared/services/shared.service';
import * as TaskActions from '../actions';
import { TaskService } from '../services/task.service';

@Injectable()
export class TasksEffects {
  private responseOK: boolean;
  private errorResponse: any;

  getTasks$: any;
  getTasksFailure$: any;

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private router: Router,
    private store: Store,
    private sharedService: SharedService,
    private authService: AuthService
  ) {
    this.responseOK = false;

    this.getTasks$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(TaskActions.getTasks),
        exhaustMap(() =>
          this.taskService.getTasks().pipe(
            map((tasks) => {
              return TaskActions.getTasksSuccess({
                tasks: tasks
              });
            }),
            catchError((error) => {
              return of(
                TaskActions.getTasksFailure({
                  payload: error
                })
              );
            })
          )
        )
      );
    });

    this.getTasksFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(TaskActions.getTasksFailure),
          map((error) => {
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );
  }
}
