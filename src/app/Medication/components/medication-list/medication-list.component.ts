import { Component, inject, OnInit } from '@angular/core';
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
export class MedicationListComponent implements OnInit {
  store = inject(Store);
  selectMedications$: Observable<MedicationDTO[] | null> =
    this.store.select(selectMedications);
  selectDisplayIsMobile$: Observable<boolean> = this.store.select(
    selectDisplayIsMobile
  );
  private user_id: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(MedicationsAction.getMedications());
  }

  createMedication(): void {
    this.router.navigateByUrl('/user/medication/new');
  }

  deleteMedication(id: number): void {
    this.store.dispatch(MedicationsAction.deleteMedication({ id }));
  }

  editMedication(id: number): void {
    this.router.navigateByUrl('/user/medication/edit/' + id);
  }
}
