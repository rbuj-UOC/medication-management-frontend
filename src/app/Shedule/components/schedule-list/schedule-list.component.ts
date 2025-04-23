import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../../Auth/selectors';
import { MedicationDTO } from '../../../Medication/models/medication.dto';

@Component({
  selector: 'app-medication-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent {
  private userId: string | null;
  private medicationId: string | null;
  medication: MedicationDTO;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.medicationId = this.activatedRoute.snapshot.paramMap.get('id');
    this.medication = new MedicationDTO('');

    this.store.select(selectUserId).subscribe((user_id) => {
      if (user_id) {
        this.userId = user_id;
      }
    });
  }

  createSchedule(): void {
    this.router.navigateByUrl('/user/schedule/form/' + this.medicationId);
  }
}
