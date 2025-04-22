import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../../Auth/selectors';
import * as MedicationsAction from '../../../Medication/actions';
import { MedicationDTO } from '../../../Medication/models/medication.dto';
import { selectMedication } from '../../../Medication/selectors/medication.selector';

@Component({
  selector: 'app-medication-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
  private userId: string | null;
  private medicationId: string | null;
  medication: MedicationDTO;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {
    this.medicationId = this.activatedRoute.snapshot.paramMap.get('id');
    this.medication = new MedicationDTO('');

    this.store.select(selectUserId).subscribe((user_id) => {
      if (user_id) {
        this.userId = user_id;
      }
    });

    this.store.select(selectMedication).subscribe((medication) => {
      this.medication = medication;
    });
  }

  ngOnInit(): void {
    if (this.medicationId) {
      this.store.dispatch(
        MedicationsAction.getMedicationById({ id: this.medicationId })
      );
    } else {
      throw new Error('Method not implemented.');
    }
  }

  createSchedule(): void {
    throw new Error('Method not implemented.');
  }
}
