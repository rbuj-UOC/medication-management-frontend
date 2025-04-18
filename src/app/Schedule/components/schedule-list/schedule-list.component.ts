import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDisplayIsMobile } from '../../../Display/selectors';
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
export class ScheduleListComponent implements OnInit {
  store = inject(Store);
  isMobile$: Observable<boolean> = this.store.select(selectDisplayIsMobile);
  selectSchedules$: Observable<ScheduleDTO[] | null> =
    this.store.select(selectSchedules);
  private medicationId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.medicationId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.medicationId) {
      this.store.dispatch(
        SchedulesAction.getSchedulesByMedicationId({
          medicationId: this.medicationId
        })
      );
    }
  }

  createSchedule(): void {
    this.router.navigateByUrl('/user/schedule/new/');
  }

  deleteSchedule(id: number): void {
    this.store.dispatch(SchedulesAction.deleteSchedule({ id }));
  }

  editSchedule(id: number): void {
    this.router.navigateByUrl('/user/schedule/edit/' + id);
  }
}
