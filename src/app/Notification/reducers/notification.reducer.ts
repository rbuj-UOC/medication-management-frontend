import { Action, createReducer, on } from '@ngrx/store';
import {
  addNotification,
  addNotificationFailure,
  addNotificationSuccess,
  logout,
  removeNotification,
  removeNotificationFailure,
  removeNotificationSuccess
} from '../actions';
import { NotificationDTO } from '../models/notification.dto';

export interface NotificationState {
  notifications: NotificationDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: NotificationState = {
  notifications: new Array<NotificationDTO>(),
  loading: false,
  loaded: false,
  error: null
};

const _notificationReducer = createReducer(
  initialState,
  // Add Notification
  on(
    addNotification,
    (state, { notification }): NotificationState => ({
      ...state,
      loading: true,
      loaded: false,
      notifications: [...state.notifications, notification]
    })
  ),
  on(
    addNotificationSuccess,
    (state, { notifications }): NotificationState => ({
      ...state,
      loading: false,
      loaded: true,
      notifications: [...state.notifications, ...notifications]
    })
  ),
  on(
    addNotificationFailure,
    (state, { payload }): NotificationState => ({
      ...state,
      loading: false,
      loaded: false,
      error: payload
    })
  ),
  // Remove Notification
  on(
    removeNotification,
    (state, { id }): NotificationState => ({
      ...state,
      loading: true,
      loaded: false,
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      )
    })
  ),
  on(
    removeNotificationSuccess,
    (state, { id }): NotificationState => ({
      ...state,
      loading: false,
      loaded: true,
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      )
    })
  ),
  on(
    removeNotificationFailure,
    (state, { payload }): NotificationState => ({
      ...state,
      loading: false,
      loaded: false,
      error: payload
    })
  ),
  // Logout
  on(logout, (): NotificationState => initialState)
);

export function notificationReducer(
  state: NotificationState | undefined,
  action: Action
): NotificationState {
  return _notificationReducer(state, action);
}
