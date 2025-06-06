import { Action, createReducer, on } from '@ngrx/store';
import { login, loginFailure, loginSuccess, logout } from '../actions';
import { AuthDTO } from '../models/auth.dto';

export interface AuthState {
  credentials: AuthDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AuthState = {
  credentials: new AuthDTO('', '', '', '', ''),
  loading: false,
  loaded: false,
  error: null
};

const _authReducer = createReducer(
  initialState,
  on(
    login,
    (state): AuthState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    loginSuccess,
    (state, action): AuthState => ({
      ...state,
      credentials: action.credentials,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    loginFailure,
    (state, { payload }): AuthState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(logout, (): AuthState => initialState)
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return _authReducer(state, action);
}
