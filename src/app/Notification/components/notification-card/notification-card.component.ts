import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotificationDTO } from '../../models/notification.dto';
import * as NotificationAction from './../../actions';

@Component({
  selector: 'app-notification-card',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent {
  @Input() public notification!: NotificationDTO;
  constructor(private store: Store) {}

  removeNotification(id: string): void {
    this.store.dispatch(NotificationAction.removeNotification({ id }));
  }
}
