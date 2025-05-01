import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as SchedulesAction from '../../actions';
import { ScheduleDTO } from '../../models/schedule.dto';
import { selectSchedules } from '../../selectors';

@Component({
  selector: 'app-schedule-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent {
  medicationId: string | null;
  schedules: ScheduleDTO[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.medicationId = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.select(selectSchedules).subscribe((schedules) => {
      this.schedules = schedules;
    });
    this.loadSchedules();
  }

  private loadSchedules(): void {
    if (this.medicationId) {
      this.store.dispatch(
        SchedulesAction.getSchedulesByMedicationId({
          medicationId: this.medicationId
        })
      );
    }
  }
}
