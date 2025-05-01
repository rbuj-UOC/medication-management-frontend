import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDisplayIsMobile } from '../../../Display/selectors';
import * as MedicationsAction from '../../actions';
import { MedicationDTO } from '../../models/medication.dto';
import { selectMedications } from '../../selectors/medication.selector';

@Component({
  selector: 'app-medication-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './medication-list.component.html',
  styleUrls: ['./medication-list.component.scss']
})
export class MedicationListComponent {
  isMobile$: Observable<boolean>;
  selectMedications$: Observable<MedicationDTO[]>;
  displayedColumns: string[] = [
    'medication-name',
    'medication-schedules',
    'medication-actions'
  ];
  private user_id: string;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.selectMedications$ = this.store.select(selectMedications);
    this.isMobile$ = this.store.select(selectDisplayIsMobile);
    this.loadMedications();
  }

  private loadMedications(): void {
    this.store.dispatch(MedicationsAction.getMedications());
  }

  createMedication(): void {
    this.router.navigateByUrl('/user/medication/form/');
  }

  deleteMedication(id: number, name: string): void {
    const result = confirm('Confirm delete medication: ' + name);
    if (result) {
      this.store.dispatch(MedicationsAction.deleteMedication({ id }));
    }
  }

  updateMedication(id: number): void {
    this.router.navigateByUrl('/user/medication/form/' + id);
  }
}
