import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NotificationCardComponent } from './components/notification-card/notification-card.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';

@NgModule({
  declarations: [NotificationCardComponent, NotificationListComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule],
  exports: [NotificationListComponent]
})
export class NotificationModule {}
