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
  getToday,
  getTodayFailure,
  getTodaySuccess,
  logout,
  skipMedication,
  skipMedicationFailure,
  skipMedicationSuccess,
  takeMedication,
  takeMedicationFailure,
  takeMedicationSuccess
} from '../actions';
import { ScheduleDTO } from '../models/schedule.dto';
import { TodayDTO } from '../models/today.dto';

export interface SchedulesState {
  schedules: ScheduleDTO[];
  schedule: ScheduleDTO;
  today: TodayDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: SchedulesState = {
  schedules: new Array<ScheduleDTO>(),
  schedule: new ScheduleDTO(new Date(), new Date(), 0, '', ''),
  today: new Array<TodayDTO>(),
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
  on(
    getToday,
    (state): SchedulesState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    getTodaySuccess,
    (state, action): SchedulesState => ({
      ...state,
      today: action.today,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    getTodayFailure,
    (state, { payload }): SchedulesState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(logout, (): SchedulesState => initialState),
  on(
    skipMedication,
    (state): SchedulesState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    skipMedicationSuccess,
    (state): SchedulesState => ({
      ...state,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    skipMedicationFailure,
    (state, { payload }): SchedulesState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    takeMedication,
    (state): SchedulesState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    takeMedicationSuccess,
    (state): SchedulesState => ({
      ...state,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    takeMedicationFailure,
    (state, { payload }): SchedulesState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  )
);

export function schedulesReducer(
  state: SchedulesState | undefined,
  action: Action
): SchedulesState {
  return _schedulesReducer(state, action);
}
