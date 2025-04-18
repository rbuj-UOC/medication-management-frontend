import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MedicationsState } from '../reducers';

const selectMedicationsState =
  createFeatureSelector<MedicationsState>('medications');

export const selectActiveMedicationStats = createSelector(
  selectMedicationsState,
  (state) => {
    return state.activeMedicationStats;
  }
);

export const selectMedicationStateLoading = createSelector(
  selectMedicationsState,
  (state) => {
    return state.loading;
  }
);

export const selectMedication = createSelector(
  selectMedicationsState,
  (state) => {
    return state.medication;
  }
);

export const selectMedicationId = createSelector(
  selectMedicationsState,
  (state) => {
    return state.medication.id;
  }
);

export const selectMedications = createSelector(
  selectMedicationsState,
  (state) => {
    return state.medications;
  }
);
