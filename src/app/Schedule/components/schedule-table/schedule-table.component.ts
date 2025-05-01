import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScheduleDTO } from '../../models/schedule.dto';

@Component({
  selector: 'app-schedule-table',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss']
})
export class ScheduleTableComponent {
  @Input() schedules: ScheduleDTO[];
  @Output() createScheduleRequest = new EventEmitter<void>();
  @Output() deleteScheduleRequest = new EventEmitter<number>();
  @Output() editScheduleRequest = new EventEmitter<number>();

  displayedColumns: string[] = ['schedule-start_date', 'schedule-actions'];

  createSchedule(): void {
    this.createScheduleRequest.emit();
  }

  deleteSchedule(id: number): void {
    const result = confirm('Confirm delete medication');
    if (result) {
      this.deleteScheduleRequest.emit(id);
    }
  }

  updateSchedule(id: number): void {
    this.editScheduleRequest.emit(id);
  }
}
