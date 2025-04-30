import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NotificationCardComponent } from './components/notification-card/notification-card.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';

@NgModule({
  declarations: [NotificationCardComponent, NotificationListComponent],
  imports: [CommonModule, MatCardModule],
  exports: [NotificationListComponent]
})
export class NotificationModule {}
