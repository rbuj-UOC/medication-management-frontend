import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MedicationsState } from '../reducers';

const selectMedicationsState =
  createFeatureSelector<MedicationsState>('medications');

export const selectMedication = createSelector(
  selectMedicationsState,
  (state) => {
    return state.medication;
  }
);

export const selectMedications = createSelector(
  selectMedicationsState,
  (state) => {
    return state.medications;
  }
);
