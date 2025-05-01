import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScheduleDTO } from '../../models/schedule.dto';

@Component({
  selector: 'app-schedule-grid',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './schedule-grid.component.html',
  styleUrls: ['./schedule-grid.component.scss']
})
export class ScheduleGridComponent {
  @Input() schedules: ScheduleDTO[] = [];
  @Output() createScheduleRequest = new EventEmitter<void>();
  @Output() deleteScheduleRequest = new EventEmitter<number>();
  @Output() editScheduleRequest = new EventEmitter<number>();

  createSchedule(): void {
    this.createScheduleRequest.emit();
  }

  editSchedule(id: number): void {
    this.editScheduleRequest.emit(id);
  }

  deleteSchedule(id: number): void {
    this.deleteScheduleRequest.emit(id);
  }
}
