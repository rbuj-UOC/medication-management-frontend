import { Action, createReducer, on } from '@ngrx/store';
import {
  createMedication,
  createMedicationFailure,
  createMedicationSuccess,
  deleteMedication,
  deleteMedicationFailure,
  deleteMedicationSuccess,
  getMedicationById,
  getMedicationByIdFailure,
  getMedicationByIdSuccess,
  getMedications,
  getMedicationsFailure,
  getMedicationsSuccess,
  logout,
  updateMedication,
  updateMedicationFailure,
  updateMedicationSuccess
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

  on(deleteMedication, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(deleteMedicationSuccess, (state, { id }) => ({
    ...state,
    medications: [
      ...state.medications.filter((medication) => medication.id !== id)
    ],
    loading: false,
    loaded: true,
    error: null
  })),
  on(deleteMedicationFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),

  on(getMedicationById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(getMedicationByIdSuccess, (state, action) => ({
    ...state,
    medication: action.medication,
    loading: false,
    loaded: true,
    error: null
  })),
  on(getMedicationByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),

  on(getMedications, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(getMedicationsSuccess, (state, action) => ({
    ...state,
    medications: action.medications,
    loading: false,
    loaded: true,
    error: null
  })),
  on(getMedicationsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),

  on(logout, () => initialState),

  on(updateMedication, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(updateMedicationSuccess, (state, action) => ({
    ...state,
    medication: action.medication,
    loading: false,
    loaded: true,
    error: null
  })),
  on(updateMedicationFailure, (state, { payload }) => ({
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
