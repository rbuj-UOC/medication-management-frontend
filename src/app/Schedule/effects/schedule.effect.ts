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
  deleteSchedule$: any;
  ScheduleActions: any;
  deleteScheduleSuccess$: any;
  deleteScheduleFailure$: any;
  getScheduleById$: any;
  getScheduleByIdFailure$: any;
  getToday$: any;
  getTodayFailure$: any;
  updateSchedule$: any;
  skipMedication$: any;
  skipMedicationFailure$: any;
  takeMedication$: any;
  takeMedicationFailure$: any;
  updateScheduleSuccess$: any;
  updateScheduleFailure$: any;

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
                'scheduleNewFeedback',
                this.responseOK,
                this.errorResponse
              );
              if (this.responseOK) {
                this.router.navigateByUrl(
                  'user/medication/edit/' + schedule.medication_id
                );
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

    this.deleteSchedule$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ScheduleActions.deleteSchedule),
        exhaustMap(({ id }) =>
          this.scheduleService.deleteSchedule(id).pipe(
            map(() => {
              return ScheduleActions.deleteScheduleSuccess({
                id: id
              });
            }),
            catchError((error) => {
              return of(
                ScheduleActions.deleteScheduleFailure({ payload: error })
              );
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'medicationEditFeedback',
                this.responseOK,
                this.errorResponse
              );
            })
          )
        )
      );
    });

    this.deleteScheduleSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(ScheduleActions.deleteScheduleSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.deleteScheduleFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(ScheduleActions.deleteScheduleFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.getScheduleById$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ScheduleActions.getScheduleById),
        exhaustMap(({ id }) =>
          this.scheduleService.getScheduleById(id).pipe(
            map((schedule) => {
              return ScheduleActions.getScheduleByIdSuccess({
                schedule: schedule
              });
            }),
            catchError((error) => {
              return of(
                ScheduleActions.getScheduleByIdFailure({ payload: error })
              );
            })
          )
        )
      );
    });

    this.getScheduleByIdFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(ScheduleActions.getScheduleByIdFailure),
          map((error) => {
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

    this.getToday$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ScheduleActions.getToday),
        exhaustMap(() =>
          this.scheduleService.getToday().pipe(
            map((today) => {
              return ScheduleActions.getTodaySuccess({
                today: today
              });
            }),
            catchError((error) => {
              return of(
                ScheduleActions.getTodayFailure({
                  payload: error
                })
              );
            })
          )
        )
      );
    });

    this.getTodayFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(ScheduleActions.getTodayFailure),
          map((error) => {
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.skipMedication$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ScheduleActions.skipMedication),
        exhaustMap(({ scheduleId }) =>
          this.scheduleService.skipMedication(scheduleId).pipe(
            map(() => {
              return ScheduleActions.skipMedicationSuccess();
            }),
            catchError((error) => {
              return of(
                ScheduleActions.skipMedicationFailure({ payload: error })
              );
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'scheduleSkipFeedback',
                this.responseOK,
                this.errorResponse
              );
            })
          )
        )
      );
    });

    this.takeMedication$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ScheduleActions.takeMedication),
        exhaustMap(({ scheduleId }) =>
          this.scheduleService.takeMedication(scheduleId).pipe(
            map(() => {
              return ScheduleActions.takeMedicationSuccess();
            }),
            catchError((error) => {
              return of(
                ScheduleActions.takeMedicationFailure({ payload: error })
              );
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'scheduleTakeFeedback',
                this.responseOK,
                this.errorResponse
              );
            })
          )
        )
      );
    });

    this.updateSchedule$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ScheduleActions.updateSchedule),
        exhaustMap(({ id, schedule }) =>
          this.scheduleService.updateSchedule(id, schedule).pipe(
            map((schedule) => {
              return ScheduleActions.updateScheduleSuccess({
                id: id,
                schedule: schedule
              });
            }),
            catchError((error) => {
              return of(
                ScheduleActions.updateScheduleFailure({ payload: error })
              );
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'scheduleEditFeedback',
                this.responseOK,
                this.errorResponse
              );
              if (this.responseOK) {
                this.router.navigateByUrl(
                  'user/medication/edit/' + schedule.medication_id
                );
              }
            })
          )
        )
      );
    });

    this.updateScheduleSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(ScheduleActions.updateScheduleSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.updateScheduleFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(ScheduleActions.updateScheduleFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );
  }
}
