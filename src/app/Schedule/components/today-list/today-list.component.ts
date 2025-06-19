import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDisplayIsMobile } from '../../../Display/selectors';
import * as SchedulesAction from '../../actions';
import { TodayDTO } from '../../models/today.dto';
import { selectToday } from '../../selectors';

@Component({
  selector: 'app-today-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './today-list.component.html',
  styleUrls: ['./today-list.component.scss']
})
export class TodayListComponent implements OnInit {
  store = inject(Store);
  schedules: TodayDTO[];
  selectToday$ = this.store.select(selectToday);
  isMobile$: Observable<boolean> = this.store.select(selectDisplayIsMobile);
  isMobile: boolean;

  constructor() {
    this.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
    this.selectToday$.subscribe((schedules) => {
      this.schedules = schedules;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(SchedulesAction.getToday());
  }

  takeMedication(scheduleId: number): void {
    this.store.dispatch(SchedulesAction.takeMedication({ scheduleId }));
  }

  skipMedication(scheduleId: number): void {
    this.store.dispatch(SchedulesAction.skipMedication({ scheduleId }));
  }
}
