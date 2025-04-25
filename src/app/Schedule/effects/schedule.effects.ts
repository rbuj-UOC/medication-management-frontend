import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, finalize, map, of } from 'rxjs';
import { SharedService } from '../../Shared/Services/shared.service';
import * as ScheduleActions from '../actions';
import { ScheduleService } from '../services/schedule.service';

@Injectable()
export class SchedulesEffects {
  private responseOK: boolean;
  private errorResponse: any;

  createSchedule$: any;
  createScheduleSuccess$: any;
  createScheduleFailure$: any;
  getSchedulesByMedicationId$: any;
  getSchedulesByMedicationIdFailure$: any;

  constructor(
    private actions$: Actions,
    private scheduleService: ScheduleService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.responseOK = false;

    this.createSchedule$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ScheduleActions.createSchedule),
        exhaustMap(({ schedule }) =>
          this.scheduleService.createSchedule(schedule).pipe(
            map((schedule) => {
              return ScheduleActions.createScheduleSuccess({
                schedule: schedule
              });
            }),
            catchError((error) => {
              return of(
                ScheduleActions.createScheduleFailure({ payload: error })
              );
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'scheduleFeedback',
                this.responseOK,
                this.errorResponse
              );

              if (this.responseOK) {
                this.router.navigateByUrl('user/schedule/list');
              }
            })
          )
        )
      );
    });

    this.createScheduleSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(ScheduleActions.createScheduleSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.createScheduleFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(ScheduleActions.createScheduleFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.getSchedulesByMedicationId$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ScheduleActions.getSchedulesByMedicationId),
        exhaustMap(({ medicationId }) =>
          this.scheduleService.getSchedulesByMedicationId(medicationId).pipe(
            map((schedules) => {
              return ScheduleActions.getSchedulesByMedicationIdSuccess({
                schedules: schedules
              });
            }),
            catchError((error) => {
              return of(
                ScheduleActions.getSchedulesByMedicationIdFailure({
                  payload: error
                })
              );
            })
          )
        )
      );
    });

    this.getSchedulesByMedicationIdFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(ScheduleActions.getSchedulesByMedicationIdFailure),
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
