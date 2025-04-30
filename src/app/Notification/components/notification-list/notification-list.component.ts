import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotificationDTO } from '../../models/notification.dto';
import { selectNotifications } from '../../selectors';

@Component({
  selector: 'app-notification-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent {
  notifications: NotificationDTO[] | null;

  constructor(private store: Store) {
    this.store.select(selectNotifications).subscribe((notifications) => {
      this.notifications = notifications;
    });
  }
}
