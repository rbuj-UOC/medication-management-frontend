import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  store: Store = inject(Store);
  selectNotifications$: Observable<NotificationDTO[] | null> =
    this.store.select(selectNotifications);
}
