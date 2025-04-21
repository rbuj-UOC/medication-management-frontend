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
