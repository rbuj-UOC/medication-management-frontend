import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FirebaseState } from './firebase.reducer';

const selectFirebase = createFeatureSelector<FirebaseState>('firebase');

export const selectFirebaseToken = createSelector(selectFirebase, (state) => {
  return state.token;
});
