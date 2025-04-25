import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './Auth/effects/auth.effects';
import * as AuthReducer from './Auth/reducers';
import { MedicationsEffects } from './Medication/effects';
import * as MedicationsReducer from './Medication/reducers';
import { SchedulesEffects } from './Schedule/effects';
import * as SchedulesReducer from './Schedule/reducers';
import { UserEffects } from './User/effects/user.effects';
import * as UserReducer from './User/reducers';

export interface AppState {
  auth: AuthReducer.AuthState;
  user: UserReducer.UserState;
  medications: MedicationsReducer.MedicationsState;
  schedules: SchedulesReducer.SchedulesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  user: UserReducer.userReducer,
  medications: MedicationsReducer.medicationsReducer,
  schedules: SchedulesReducer.schedulesReducer
};

export const EffectsArray: any[] = [
  AuthEffects,
  UserEffects,
  MedicationsEffects,
  SchedulesEffects
];
