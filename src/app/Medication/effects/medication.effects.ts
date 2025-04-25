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

  getMedicationById$: any;
  getMedicationByIdFailure$: any;

  getMedications$: any;
  getMedicationsFailure$: any;

  updateMedication$: any;
  updateMedicationSuccess$: any;
  updateMedicationFailure$: any;

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
                this.router.navigateByUrl('user/medication/list');
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

    this.getMedicationById$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MedicationActions.getMedicationById),
        exhaustMap(({ id }) =>
          this.medicationService.getMedicationById(id).pipe(
            map((medication) => {
              return MedicationActions.getMedicationByIdSuccess({
                medication: medication
              });
            }),
            catchError((error) => {
              return of(
                MedicationActions.getMedicationByIdFailure({ payload: error })
              );
            })
          )
        )
      );
    });

    this.getMedicationByIdFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.getMedicationByIdFailure),
          map((error) => {
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.getMedications$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MedicationActions.getMedications),
        exhaustMap(() =>
          this.medicationService.getMedications().pipe(
            map((medications) => {
              return MedicationActions.getMedicationsSuccess({
                medications: medications
              });
            }),
            catchError((error) => {
              return of(
                MedicationActions.getMedicationsFailure({
                  payload: error
                })
              );
            })
          )
        )
      );
    });

    this.getMedicationsFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.getMedicationsFailure),
          map((error) => {
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.updateMedication$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MedicationActions.updateMedication),
        exhaustMap(({ id, medication }) =>
          this.medicationService.updateMedication(id, medication).pipe(
            map((medication) => {
              return MedicationActions.updateMedicationSuccess({
                id: id,
                medication: medication
              });
            }),
            catchError((error) => {
              return of(
                MedicationActions.updateMedicationFailure({ payload: error })
              );
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'medicationFeedback',
                this.responseOK,
                this.errorResponse
              );

              if (this.responseOK) {
                this.router.navigateByUrl('user/medication/list');
              }
            })
          )
        )
      );
    });

    this.updateMedicationSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.updateMedicationSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.updateMedicationFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.updateMedicationFailure),
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
