import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FirebaseState } from '../reducers';

const selectFirebase = createFeatureSelector<FirebaseState>('firebase');

export const selectFirebaseToken = createSelector(selectFirebase, (state) => {
  return state.token;
});
