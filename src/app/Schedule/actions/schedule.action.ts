import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ScheduleDTO } from '../models/schedule.dto';
import { TodayDTO } from '../models/today.dto';

export const createSchedule = createAction(
  '[NewSchedule Page] Create Schedule',
  props<{ schedule: ScheduleDTO }>()
);

export const createScheduleSuccess = createAction(
  '[NewSchedule Page] Create Schedule Success',
  props<{ schedule: ScheduleDTO }>()
);

export const createScheduleFailure = createAction(
  '[NewSchedule Page] Create Schedule Failure',
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
  '[EditSchedule Page] Get Schedule',
  props<{ id: string }>()
);

export const getScheduleByIdSuccess = createAction(
  '[EditSchedule Page] Get Schedule Success',
  props<{ schedule: ScheduleDTO }>()
);

export const getScheduleByIdFailure = createAction(
  '[EditSchedule Page] Get Schedule Failure',
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

export const getToday = createAction('[Today Page] Get Today');

export const getTodaySuccess = createAction(
  '[Today Page] Get Today Success',
  props<{ today: TodayDTO[] }>()
);

export const getTodayFailure = createAction(
  '[Today Page] Get Today Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const logout = createAction('[Schedule Service] Logout');

export const skipMedication = createAction(
  '[Today Page] Skip Medication',
  props<{ scheduleId: number }>()
);

export const skipMedicationSuccess = createAction(
  '[Today Page] Skip Medication Success'
);

export const skipMedicationFailure = createAction(
  '[Today Page] Skip Medication Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const takeMedication = createAction(
  '[Today Page] Take Medication',
  props<{ scheduleId: number }>()
);

export const takeMedicationSuccess = createAction(
  '[Today Page] Take Medication Success'
);

export const takeMedicationFailure = createAction(
  '[Today Page] Take Medication Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateSchedule = createAction(
  '[EditSchedule Page] Update Schedules',
  props<{ id: string; schedule: ScheduleDTO }>()
);

export const updateScheduleSuccess = createAction(
  '[EditSchedule Page] Update Schedules Success',
  props<{ id: string; schedule: ScheduleDTO }>()
);

export const updateScheduleFailure = createAction(
  '[EditSchedule Page] Update Schedules Failure',
  props<{ payload: HttpErrorResponse }>()
);
