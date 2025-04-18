import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationState } from '../reducers';

const selectNotificationState =
  createFeatureSelector<NotificationState>('notifications');

export const selectNotifications = createSelector(
  selectNotificationState,
  (state) => {
    return state.notifications;
  }
);
