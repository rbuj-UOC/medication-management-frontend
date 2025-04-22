import { Action, createReducer, on } from '@ngrx/store';
import {
  createMedication,
  createMedicationFailure,
  createMedicationSuccess,
  getMedicationsByUserId,
  getMedicationsByUserIdFailure,
  getMedicationsByUserIdSuccess
} from '../actions';
import { MedicationDTO } from '../models/medication.dto';

export interface MedicationsState {
  medications: MedicationDTO[];
  medication: MedicationDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: MedicationsState = {
  medications: new Array<MedicationDTO>(),
  medication: new MedicationDTO(''),
  loading: false,
  loaded: false,
  error: null
};

const _medicationsReducer = createReducer(
  initialState,
  on(createMedication, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(createMedicationSuccess, (state, action) => ({
    ...state,
    medication: action.medication,
    loading: false,
    loaded: true,
    error: null
  })),
  on(createMedicationFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload
  })),
  on(getMedicationsByUserId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(getMedicationsByUserIdSuccess, (state, action) => ({
    ...state,
    medications: action.medications,
    loading: false,
    loaded: true,
    error: null
  })),
  on(getMedicationsByUserIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  }))
);

export function medicationsReducer(
  state: MedicationsState | undefined,
  action: Action
): MedicationsState {
  return _medicationsReducer(state, action);
}
