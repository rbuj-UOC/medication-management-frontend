import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as SchedulesAction from '../../actions';
import { selectConfirmations } from '../../selectors';

@Component({
  selector: 'app-history-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  store = inject(Store);
  confirmations$ = this.store.select(selectConfirmations);
  displayedColumns: string[] = ['notification_at', 'name', 'time', 'confirmed'];

  ngOnInit(): void {
    this.store.dispatch(SchedulesAction.getConfirmations());
  }
}
