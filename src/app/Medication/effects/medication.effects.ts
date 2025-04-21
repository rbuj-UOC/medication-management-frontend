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
  }
}
