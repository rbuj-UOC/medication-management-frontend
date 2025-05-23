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

  getActiveMedicationStats$: any;
  getActiveMedicationStatsFailure$: any;

  getAllMedications$: any;
  getAllMedicationsFailure$: any;

  getMedicationById$: any;
  getMedicationByIdFailure$: any;

  getMedications$: any;
  getMedicationsFailure$: any;

  pauseMedication$: any;
  pauseMedicationSuccess$: any;
  pauseMedicationFailure$: any;

  resumeMedication$: any;
  resumeMedicationSuccess$: any;
  resumeMedicationFailure$: any;

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
            })
          )
        )
      );
    });

    this.createMedicationSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.createMedicationSuccess),
          map(async () => {
            this.responseOK = true;
            await this.sharedService.managementToast(
              'medicationNewFeedback',
              this.responseOK,
              this.errorResponse
            );
            this.router.navigateByUrl('user/medication/list');
          })
        );
      },
      { dispatch: false }
    );

    this.createMedicationFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.createMedicationFailure),
          map(async (error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
            await this.sharedService.managementToast(
              'medicationNewFeedback',
              this.responseOK,
              this.errorResponse
            );
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

    this.getAllMedications$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MedicationActions.getAllMedications),
        exhaustMap(() =>
          this.medicationService.getAllMedications().pipe(
            map((medications) => {
              return MedicationActions.getAllMedicationsSuccess({
                medications: medications
              });
            }),
            catchError((error) => {
              return of(
                MedicationActions.getAllMedicationsFailure({
                  payload: error
                })
              );
            })
          )
        )
      );
    });

    this.getAllMedicationsFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.getAllMedicationsFailure),
          map((error) => {
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.getActiveMedicationStats$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MedicationActions.getActiveMedicationStats),
        exhaustMap(() =>
          this.medicationService.getActiveMedicationStats().pipe(
            map((activeMedicationStats) => {
              return MedicationActions.getActiveMedicationStatsSuccess({
                activeMedicationStats: activeMedicationStats
              });
            }),
            catchError((error) => {
              return of(
                MedicationActions.getActiveMedicationStatsFailure({
                  payload: error
                })
              );
            })
          )
        )
      );
    });

    this.getActiveMedicationStatsFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.getActiveMedicationStatsFailure),
          map((error) => {
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

    this.pauseMedication$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MedicationActions.pauseMedication),
        exhaustMap(({ id }) =>
          this.medicationService.pauseMedication(id).pipe(
            map(() => {
              return MedicationActions.pauseMedicationSuccess();
            }),
            catchError((error) => {
              return of(
                MedicationActions.pauseMedicationFailure({ payload: error })
              );
            })
          )
        )
      );
    });

    this.pauseMedicationSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.pauseMedicationSuccess),
          map(async () => {
            this.responseOK = true;
            await this.sharedService.managementToast(
              'medicationEditFeedback',
              this.responseOK,
              this.errorResponse
            );
            this.router.navigateByUrl('user/medication/list');
          })
        );
      },
      { dispatch: false }
    );

    this.pauseMedicationFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.pauseMedicationFailure),
          map(async (error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
            await this.sharedService.managementToast(
              'medicationEditFeedback',
              this.responseOK,
              this.errorResponse
            );
            this.router.navigateByUrl('user/medication/list');
          })
        );
      },
      { dispatch: false }
    );

    this.resumeMedication$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MedicationActions.resumeMedication),
        exhaustMap(({ id }) =>
          this.medicationService.resumeMedication(id).pipe(
            map(() => {
              return MedicationActions.resumeMedicationSuccess();
            }),
            catchError((error) => {
              return of(
                MedicationActions.resumeMedicationFailure({ payload: error })
              );
            })
          )
        )
      );
    });

    this.resumeMedicationSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.resumeMedicationSuccess),
          map(async () => {
            this.responseOK = true;
            await this.sharedService.managementToast(
              'medicationEditFeedback',
              this.responseOK,
              this.errorResponse
            );
            this.router.navigateByUrl('user/medication/list');
          })
        );
      },
      { dispatch: false }
    );

    this.resumeMedicationFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.resumeMedicationFailure),
          map(async (error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
            await this.sharedService.managementToast(
              'medicationEditFeedback',
              this.responseOK,
              this.errorResponse
            );
            this.router.navigateByUrl('user/medication/list');
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
                'medicationEditFeedback',
                this.responseOK,
                this.errorResponse
              );
            })
          )
        )
      );
    });

    this.updateMedicationSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(MedicationActions.updateMedicationSuccess),
          map(async () => {
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
          map(async (error) => {
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
