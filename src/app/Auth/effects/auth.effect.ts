import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { MedicationService } from '../../Medication/services/medication.service';
import { NotificationService } from '../../Notification/services/notification.service';
import { ScheduleService } from '../../Schedule/services/schedule.service';
import { SharedService } from '../../Shared/Services/shared.service';
import { TaskService } from '../../Task/services/task.service';
import { UserService } from '../../User/services/user.service';
import * as AuthActions from '../actions';
import { AuthDTO } from '../models/auth.dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  private responseOK: boolean;
  private errorResponse: any;
  loginFailure$: any;
  loginSuccess$: any;
  login$: any;
  logout$: any;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private userService: UserService,
    private medicationService: MedicationService,
    private scheduleService: ScheduleService,
    private notificationService: NotificationService,
    private taskService: TaskService
  ) {
    this.responseOK = false;

    this.login$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.login),
        exhaustMap(({ credentials }) =>
          this.authService.login(credentials).pipe(
            map((userToken) => {
              const credentialsTemp: AuthDTO = {
                username: undefined,
                password: undefined,
                user_id: userToken.user_id,
                user_role: userToken.user_role,
                access_token: userToken.access_token
              };
              return AuthActions.loginSuccess({
                credentials: credentialsTemp
              });
            }),
            catchError((error) => {
              return of(AuthActions.loginFailure({ payload: error }));
            })
          )
        )
      );
    });

    this.loginSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(AuthActions.loginSuccess),
          map(async ({ credentials }) => {
            this.responseOK = true;
            await this.sharedService.managementToast(
              'loginFeedback',
              this.responseOK,
              this.errorResponse
            );
            if (credentials.user_role === 'admin') {
              this.router.navigateByUrl('admin/dashboard');
            } else if (credentials.user_role === 'user') {
              this.router.navigateByUrl('user/today');
            }
          })
        );
      },
      { dispatch: false }
    );

    this.loginFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(AuthActions.loginFailure),
          map(async (error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
            await this.sharedService.managementToast(
              'loginFeedback',
              this.responseOK,
              this.errorResponse
            );
          })
        );
      },
      { dispatch: false }
    );

    this.logout$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(AuthActions.logout),
          map(() => {
            this.userService.logout();
            this.medicationService.logout();
            this.notificationService.logout();
            this.scheduleService.logout();
            this.taskService.logout();
          })
        );
      },
      { dispatch: false }
    );
  }
}
