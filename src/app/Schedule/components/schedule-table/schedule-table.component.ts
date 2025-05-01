import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as SchedulesAction from '../../actions';
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
  displayedColumns: string[] = ['schedule-start_date', 'schedule-actions'];

  constructor(
    private router: Router,
    private store: Store
  ) {}

  createSchedule(): void {
    this.router.navigateByUrl('/user/schedule/form/');
  }

  deleteSchedule(id: number): void {
    const result = confirm('Confirm delete medication');
    if (result) {
      this.store.dispatch(SchedulesAction.deleteSchedule({ id }));
    }
  }

  updateSchedule(scheduleId: number): void {
    this.router.navigateByUrl('/user/schedule/form/' + scheduleId);
  }
}
