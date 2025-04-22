import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { MedicationDTO } from '../models/medication.dto';

export const createMedication = createAction(
  '[MedicationForm Page] Create medication',
  props<{ medication: MedicationDTO }>()
);

export const createMedicationSuccess = createAction(
  '[MedicationForm Page] Create medication Success',
  props<{ medication: MedicationDTO }>()
);

export const createMedicationFailure = createAction(
  '[MedicationForm Page] Create medication Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteMedication = createAction(
  '[MedicationList Page] Delete medication',
  props<{ id: number }>()
);
export const deleteMedicationSuccess = createAction(
  '[MedicationList Page] Delete medication Success',
  props<{ id: number }>()
);

export const deleteMedicationFailure = createAction(
  '[MedicationList Page] Delete medication Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getMedicationsByUserId = createAction(
  '[MedicationList Page] Get medication list',
  props<{ user_id: string }>()
);

export const getMedicationsByUserIdSuccess = createAction(
  '[MedicationList Page] Get medication list Success',
  props<{ medications: MedicationDTO[] }>()
);

export const getMedicationsByUserIdFailure = createAction(
  '[MedicationList Page] Get medication list Failure',
  props<{ payload: HttpErrorResponse }>()
);
