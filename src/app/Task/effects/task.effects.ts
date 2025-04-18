import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { AuthService } from '../../Auth/services/auth.service';
import { SharedService } from '../../Shared/Services/shared.service';
import * as TaskActions from '../actions';
import { TaskService } from '../services/task.service';

@Injectable()
export class TasksEffects {
  private responseOK: boolean;
  private errorResponse: any;

  deleteTask$: any;
  deleteTaskSuccess$: any;
  deleteTaskFailure$: any;

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

    this.deleteTask$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(TaskActions.deleteTask),
        exhaustMap(({ id }) =>
          this.taskService.deleteTask(id).pipe(
            map(() => {
              return TaskActions.deleteTaskSuccess({
                id: id
              });
            }),
            catchError((error) => {
              return of(TaskActions.deleteTaskFailure({ payload: error }));
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'medicationListFeedback',
                this.responseOK,
                this.errorResponse
              );
            })
          )
        )
      );
    });

    this.deleteTaskSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(TaskActions.deleteTaskSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.deleteTaskFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(TaskActions.deleteTaskFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

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
