import { Action, createReducer, on } from '@ngrx/store';
import {
  createSchedule,
  createScheduleFailure,
  createScheduleSuccess,
  deleteSchedule,
  deleteScheduleFailure,
  deleteScheduleSuccess,
  getScheduleById,
  getScheduleByIdFailure,
  getScheduleByIdSuccess,
  getSchedulesByMedicationId,
  getSchedulesByMedicationIdFailure,
  getSchedulesByMedicationIdSuccess,
  logout
} from '../actions';
import { ScheduleDTO } from '../models/schedule.dto';

export interface SchedulesState {
  schedules: ScheduleDTO[];
  schedule: ScheduleDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: SchedulesState = {
  schedules: new Array<ScheduleDTO>(),
  schedule: new ScheduleDTO(new Date(), new Date(), 0, '', ''),
  loading: false,
  loaded: false,
  error: null
};

const _schedulesReducer = createReducer(
  initialState,
  on(
    createSchedule,
    (state): SchedulesState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    createScheduleSuccess,
    (state, action): SchedulesState => ({
      ...state,
      schedule: action.schedule,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    createScheduleFailure,
    (state, { payload }): SchedulesState => ({
      ...state,
      loading: false,
      loaded: false,
      error: payload
    })
  ),
  on(
    deleteSchedule,
    (state): SchedulesState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    deleteScheduleSuccess,
    (state, { id }): SchedulesState => ({
      ...state,
      schedules: [...state.schedules.filter((schedule) => schedule.id !== id)],
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    deleteScheduleFailure,
    (state, { payload }): SchedulesState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    getScheduleById,
    (state): SchedulesState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    getScheduleByIdSuccess,
    (state, action): SchedulesState => ({
      ...state,
      schedule: action.schedule,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    getScheduleByIdFailure,
    (state, { payload }): SchedulesState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    getSchedulesByMedicationId,
    (state): SchedulesState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    getSchedulesByMedicationIdSuccess,
    (state, action): SchedulesState => ({
      ...state,
      schedules: action.schedules,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    getSchedulesByMedicationIdFailure,
    (state, { payload }): SchedulesState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(logout, (): SchedulesState => initialState)
);

export function schedulesReducer(
  state: SchedulesState | undefined,
  action: Action
): SchedulesState {
  return _schedulesReducer(state, action);
}
