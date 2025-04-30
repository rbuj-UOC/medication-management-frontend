import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { NotificationDTO } from '../models/notification.dto';

export const logout = createAction('[Notification Service] Logout');

export const addNotification = createAction(
  'Add Notification',
  props<{ notification: NotificationDTO }>()
);
export const addNotificationSuccess = createAction(
  'Add Notification Success',
  props<{ notifications: NotificationDTO[] }>()
);
export const addNotificationFailure = createAction(
  'Add Notification Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const removeNotification = createAction(
  'Remove Notification',
  props<{ id: string }>()
);
export const removeNotificationSuccess = createAction(
  'Remove Notification Success',
  props<{ id: string; notifications: NotificationDTO[] }>()
);
export const removeNotificationFailure = createAction(
  'Remove Notification Failure',
  props<{ payload: HttpErrorResponse }>()
);
