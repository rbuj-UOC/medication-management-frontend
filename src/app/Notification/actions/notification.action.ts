import { createAction, props } from '@ngrx/store';
import { NotificationDTO } from '../models/notification.dto';

export const logout = createAction('[Notification Service] Logout');

export const addNotification = createAction(
  '[AppComponent] Add Notification',
  props<{ notification: NotificationDTO }>()
);

export const removeNotification = createAction(
  '[NotificationCard] Remove Notification',
  props<{ id: string }>()
);
