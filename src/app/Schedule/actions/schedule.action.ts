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

export const deleteSchedule = createAction(
  '[MedicationForm Page] Delete Schedule',
  props<{ id: number }>()
);

export const deleteScheduleSuccess = createAction(
  '[MedicationForm Page] Delete Schedule Success',
  props<{ id: number }>()
);

export const deleteScheduleFailure = createAction(
  '[MedicationForm Page] Delete Schedule Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getScheduleById = createAction(
  '[ScheduleForm Page] Get Schedule',
  props<{ id: string }>()
);

export const getScheduleByIdSuccess = createAction(
  '[ScheduleForm Page] Get Schedule Success',
  props<{ schedule: ScheduleDTO }>()
);

export const getScheduleByIdFailure = createAction(
  '[ScheduleForm Page] Get Schedule Failure',
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

export const updateSchedule = createAction(
  '[ScheduleForm Page] Update Schedules',
  props<{ id: string; schedule: ScheduleDTO }>()
);

export const updateScheduleSuccess = createAction(
  '[ScheduleForm Page] Update Schedules Success',
  props<{ id: string; schedule: ScheduleDTO }>()
);

export const updateScheduleFailure = createAction(
  '[ScheduleForm Page] Update Schedules Failure',
  props<{ payload: HttpErrorResponse }>()
);
