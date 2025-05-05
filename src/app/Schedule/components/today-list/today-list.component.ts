import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor() {
    this.selectToday$.subscribe((schedules) => {
      this.schedules = schedules;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(SchedulesAction.getToday());
  }
}
