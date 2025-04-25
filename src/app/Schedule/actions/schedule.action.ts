import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ScheduleDTO } from '../models/schedule.dto';

export const createSchedule = createAction(
  '[ScheduleForm Page] Create Schedule',
  props<{ schedule: ScheduleDTO }>()
);

export const createScheduleSuccess = createAction(
  '[ScheduleForm Page] Create Schedule Success',
  props<{ schedule: ScheduleDTO }>()
);

export const createScheduleFailure = createAction(
  '[ScheduleForm Page] Create Schedule Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getSchedulesByMedicationId = createAction(
  '[MedicationForm Page] Get Schedule List By Medication Id',
  props<{ medicationId: string }>()
);

export const getSchedulesByMedicationIdSuccess = createAction(
  '[MedicationForm Page] Get Schedule List By Medication Id Success',
  props<{ schedules: ScheduleDTO[] }>()
);

export const getSchedulesByMedicationIdFailure = createAction(
  '[MedicationForm Page] Get Schedule List By Medication Id Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const logout = createAction('[Schedule Service] Logout');
