import { Action, createReducer, on } from '@ngrx/store';
import { addNotification, logout, removeNotification } from '../actions';
import { NotificationDTO } from '../models/notification.dto';

export interface NotificationState {
  notifications: NotificationDTO[];
}

export const initialState: NotificationState = {
  notifications: new Array<NotificationDTO>()
};

const _notificationReducer = createReducer(
  initialState,
  // Add Notification
  on(
    addNotification,
    (state, { notification }): NotificationState => ({
      ...state,
      notifications: [...state.notifications, notification]
    })
  ),
  // Remove Notification
  on(
    removeNotification,
    (state, { id }): NotificationState => ({
      ...state,
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      )
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
