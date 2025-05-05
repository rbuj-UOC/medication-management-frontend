import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { MedicationDTO } from '../models/medication.dto';

export const createMedication = createAction(
  '[NewMedication Page] Create medication',
  props<{ medication: MedicationDTO }>()
);

export const createMedicationSuccess = createAction(
  '[NewMedication Page] Create medication Success',
  props<{ medication: MedicationDTO }>()
);

export const createMedicationFailure = createAction(
  '[NewMedication Page] Create medication Failure',
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

export const getMedicationById = createAction(
  '[EditMedication Page] Get medication',
  props<{ id: string }>()
);

export const getMedicationByIdSuccess = createAction(
  '[EditMedication Page] Get medication Success',
  props<{ medication: MedicationDTO }>()
);

export const getMedicationByIdFailure = createAction(
  '[EditMedication Page] Get medication Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getMedications = createAction(
  '[MedicationList Page] Get medication list'
);

export const getMedicationsSuccess = createAction(
  '[MedicationList Page] Get medication list Success',
  props<{ medications: MedicationDTO[] }>()
);

export const getMedicationsFailure = createAction(
  '[MedicationList Page] Get medication list Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const logout = createAction('[Medication Service] Logout');

export const pauseMedication = createAction(
  '[EditMedication Page] Pause Medication',
  props<{ id: number }>()
);

export const pauseMedicationSuccess = createAction(
  '[EditMedication Page] Pause Medication Success'
);

export const pauseMedicationFailure = createAction(
  '[EditMedication Page] Pause Medication Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const resumeMedication = createAction(
  '[EditMedication Page] Resume Medication',
  props<{ id: number }>()
);

export const resumeMedicationSuccess = createAction(
  '[EditMedication Page] Resume Medication Success'
);

export const resumeMedicationFailure = createAction(
  '[EditMedication Page] Resume Medication Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateMedication = createAction(
  '[EditMedication Page] Update medication',
  props<{ id: string; medication: MedicationDTO }>()
);

export const updateMedicationSuccess = createAction(
  '[EditMedication Page] Update medication Success',
  props<{ id: string; medication: MedicationDTO }>()
);

export const updateMedicationFailure = createAction(
  '[EditMedication Page] Update medication Failure',
  props<{ payload: HttpErrorResponse }>()
);
