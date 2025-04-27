import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../../Auth/selectors';
import { selectDisplayIsMobile } from '../../../Display/display.selector';
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
  medications: MedicationDTO[];
  displayedColumns: string[] = [
    'medication-name',
    'medication-schedules',
    'medication-actions'
  ];
  private user_id: string;
  isMobile = true;
  isMobile$: any;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.user_id = '';

    this.store.select(selectUserId).subscribe((user_id) => {
      if (user_id) {
        this.user_id = user_id;
      }
    });

    this.store.select(selectMedications).subscribe((medications) => {
      this.medications = medications;
    });

    this.isMobile$ = this.store.select(selectDisplayIsMobile);
    this.isMobile$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });

    this.loadMedications();
  }

  private loadMedications(): void {
    if (this.user_id) {
      this.store.dispatch(MedicationsAction.getMedications());
    }
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
