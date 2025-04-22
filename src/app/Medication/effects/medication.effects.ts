import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, finalize, map, of } from 'rxjs';
import { SharedService } from '../../Shared/Services/shared.service';
import * as MedicationActions from '../actions';
import { MedicationService } from '../services/medication.service';

@Injectable()
export class MedicationsEffects {
  private responseOK: boolean;
  private errorResponse: any;

  createMedication$: any;
  createMedicationSuccess$: any;
  createMedicationFailure$: any;

  deleteMedication$: any;
  deleteMedicationSuccess$: any;
  deleteMedicationFailure$: any;

  getMedicationsByUserId$: any;
  getMedicationsByUserIdFailure$: any;

  constructor(
    private actions$: Actions,
    private medicationService: MedicationService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.responseOK = false;

    this.createMedication$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MedicationActions.createMedication),
        exhaustMap(({ medication }) =>
          this.medicationService.createMedication(medication).pipe(
            map((medication) => {
              return MedicationActions.createMedicationSuccess({
                medication: medication
              });
            }),
            catchError((error) => {
              return of(
                MedicationActions.createMedicationFailure({ payload: error })
              );
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'medicationFeedback',
                this.responseOK,
                this.errorResponse
              );

              if (this.responseOK) {
                this.router.navigateByUrl('user/medications');
              }
            })
          )
        )
      );
    });

    this.createMedicationSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.createMedicationSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.createMedicationFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.createMedicationFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.deleteMedication$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MedicationActions.deleteMedication),
        exhaustMap(({ id }) =>
          this.medicationService.deleteMedication(id).pipe(
            map(() => {
              return MedicationActions.deleteMedicationSuccess({
                id: id
              });
            }),
            catchError((error) => {
              return of(
                MedicationActions.deleteMedicationFailure({ payload: error })
              );
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

    this.deleteMedicationSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.deleteMedicationSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.deleteMedicationFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.deleteMedicationFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.getMedicationsByUserId$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MedicationActions.getMedicationsByUserId),
        exhaustMap(({ user_id }) =>
          this.medicationService.getMedicationsByUserId(user_id).pipe(
            map((medications) => {
              return MedicationActions.getMedicationsByUserIdSuccess({
                medications: medications
              });
            }),
            catchError((error) => {
              return of(
                MedicationActions.getMedicationsByUserIdFailure({
                  payload: error
                })
              );
            })
          )
        )
      );
    });

    this.getMedicationsByUserIdFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.getMedicationsByUserIdFailure),
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
