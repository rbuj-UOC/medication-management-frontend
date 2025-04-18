import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './Auth/effects/auth.effect';
import * as AuthReducer from './Auth/reducers';
import * as DisplayReducer from './Display/reducers';
import * as FirebaseReducer from './Firebase/reducers';
import { MedicationsEffects } from './Medication/effects';
import * as MedicationsReducer from './Medication/reducers';
import * as NotificationsReducer from './Notification/reducers';
import { SchedulesEffects } from './Schedule/effects';
import * as SchedulesReducer from './Schedule/reducers';
import { TasksEffects } from './Task/effects';
import * as TaskReducer from './Task/reducers';
import { UserEffects } from './User/effects/user.effect';
import * as UserReducer from './User/reducers';

export interface AppState {
  auth: AuthReducer.AuthState;
  display: DisplayReducer.DisplayState;
  firebase: FirebaseReducer.FirebaseState;
  medications: MedicationsReducer.MedicationsState;
  notifications: NotificationsReducer.NotificationState;
  schedules: SchedulesReducer.SchedulesState;
  tasks: TaskReducer.TaskState;
  user: UserReducer.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  display: DisplayReducer.displayReducer,
  firebase: FirebaseReducer.firebaseReducer,
  medications: MedicationsReducer.medicationsReducer,
  notifications: NotificationsReducer.notificationReducer,
  schedules: SchedulesReducer.schedulesReducer,
  tasks: TaskReducer.taskReducer,
  user: UserReducer.userReducer
};

export const EffectsArray: any[] = [
  AuthEffects,
  UserEffects,
  MedicationsEffects,
  SchedulesEffects,
  TasksEffects
];
