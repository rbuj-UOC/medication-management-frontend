import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScheduleDTO } from '../../models/schedule.dto';

@Component({
  selector: 'app-schedule-card',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent {
  @Input() schedule: ScheduleDTO;
  @Output() deleteScheduleRequest = new EventEmitter<number>();
  @Output() editScheduleRequest = new EventEmitter<number>();

  deleteSchedule(): void {
    const result = confirm('Confirm delete schedule');
    if (result) {
      this.deleteScheduleRequest.emit(this.schedule.id);
    }
  }

  editSchedule(): void {
    this.editScheduleRequest.emit(this.schedule.id);
  }
}
