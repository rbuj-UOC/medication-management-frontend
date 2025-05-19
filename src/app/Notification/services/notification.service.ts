import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  Messaging,
  onMessage
} from 'firebase/messaging';
import { environment } from '../../../environments/environment';
import * as FirebaseAction from '../../Firebase/actions';
import * as NotificationAction from '../actions';
import { NotificationDTO } from '../models/notification.dto';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  messaging: Messaging;
  store = inject(Store);

  async saveMessagingDeviceToken() {
    const currentToken = await getToken(this.messaging);
    if (currentToken) {
      this.store.dispatch(FirebaseAction.setToken({ token: currentToken }));
    } else {
      // Need to request permissions to show notifications.
      this.requestNotificationsPermissions();
    }
  }

  requestNotificationsPermissions = async () => {
    console.log('Requesting notifications permission...');
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // Notification permission granted.
      await this.saveMessagingDeviceToken();
    } else {
      console.log('Unable to get permission to notify.');
    }
  };

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.messaging = getMessaging(app);
    onMessage(this.messaging, (payload) => {
      const newNotification = new NotificationDTO(
        payload.messageId,
        payload.notification.title,
        payload.notification.body
      );
      this.store.dispatch(
        NotificationAction.addNotification({ notification: newNotification })
      );
    });
  }

  logout() {
    this.store.dispatch(NotificationAction.logout());
  }
}
