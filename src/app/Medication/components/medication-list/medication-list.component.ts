import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../../Auth/selectors';
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
  displayedColumns: string[] = ['medication-name', 'medication-actions'];
  private user_id: string;

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

    this.loadMedications();
  }

  private loadMedications(): void {
    if (this.user_id) {
      this.store.dispatch(
        MedicationsAction.getMedicationsByUserId({ user_id: this.user_id })
      );
    }
  }

  createMedication(): void {
    this.router.navigateByUrl('/user/medication/');
  }

  deleteMedication(id: number, name: string): void {
    const result = confirm('Confirm delete medication: ' + name);
    if (result) {
      this.store.dispatch(MedicationsAction.deleteMedication({ id }));
    }
  }

  scheduleMedication(id: number): void {
    this.router.navigateByUrl('/user/schedules/' + id);
  }

  updateMedication(id: number): void {
    this.router.navigateByUrl('/user/medication/' + id);
  }
}
