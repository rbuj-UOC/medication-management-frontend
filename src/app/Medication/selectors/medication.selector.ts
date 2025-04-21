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
