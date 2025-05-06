import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as NotificationAction from '../actions';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  store = inject(Store);

  logout() {
    this.store.dispatch(NotificationAction.logout());
  }
}
