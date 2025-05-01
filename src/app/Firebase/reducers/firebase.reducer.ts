import { Action, createReducer, on } from '@ngrx/store';
import * as FirebaseActions from '../actions';

export interface FirebaseState {
  token: string;
}

export const initialState: FirebaseState = {
  token: ''
};

export const _firebaseReducer = createReducer(
  initialState,
  on(
    FirebaseActions.setToken,
    (state, { token }): FirebaseState => ({
      token: token
    })
  ),
  on(FirebaseActions.resetToken, (): FirebaseState => initialState)
);

export function firebaseReducer(
  state: FirebaseState | undefined,
  action: Action
): FirebaseState {
  return _firebaseReducer(state, action);
}
