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
  pauseMedication,
  pauseMedicationFailure,
  pauseMedicationSuccess,
  resumeMedication,
  resumeMedicationFailure,
  resumeMedicationSuccess,
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
  on(
    createMedication,
    (state): MedicationsState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    createMedicationSuccess,
    (state, action): MedicationsState => ({
      ...state,
      medication: action.medication,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    createMedicationFailure,
    (state, { payload }): MedicationsState => ({
      ...state,
      loading: false,
      loaded: false,
      error: payload
    })
  ),
  on(
    deleteMedication,
    (state): MedicationsState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    deleteMedicationSuccess,
    (state, { id }): MedicationsState => ({
      ...state,
      medications: [
        ...state.medications.filter((medication) => medication.id !== id)
      ],
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    deleteMedicationFailure,
    (state, { payload }): MedicationsState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    getMedicationById,
    (state): MedicationsState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    getMedicationByIdSuccess,
    (state, action): MedicationsState => ({
      ...state,
      medication: action.medication,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    getMedicationByIdFailure,
    (state, { payload }): MedicationsState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    getMedications,
    (state): MedicationsState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    getMedicationsSuccess,
    (state, action): MedicationsState => ({
      ...state,
      medications: action.medications,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    getMedicationsFailure,
    (state, { payload }): MedicationsState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(logout, (): MedicationsState => initialState),
  on(
    pauseMedication,
    (state): MedicationsState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    pauseMedicationSuccess,
    (state): MedicationsState => ({
      ...state,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    pauseMedicationFailure,
    (state, { payload }): MedicationsState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    resumeMedication,
    (state): MedicationsState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    resumeMedicationSuccess,
    (state): MedicationsState => ({
      ...state,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    resumeMedicationFailure,
    (state, { payload }): MedicationsState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    updateMedication,
    (state): MedicationsState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    updateMedicationSuccess,
    (state, action): MedicationsState => ({
      ...state,
      medication: action.medication,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    updateMedicationFailure,
    (state, { payload }): MedicationsState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  )
);

export function medicationsReducer(
  state: MedicationsState | undefined,
  action: Action
): MedicationsState {
  return _medicationsReducer(state, action);
}
