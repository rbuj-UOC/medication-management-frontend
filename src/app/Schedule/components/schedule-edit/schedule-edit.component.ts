import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectMedicationId } from '../../../Medication/selectors/medication.selector';
import * as ScheduleAction from '../../actions';
import { ScheduleDTO } from '../../models/schedule.dto';
import { selectSchedule } from '../../selectors';

@Component({
  selector: 'app-schedule-form',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.scss']
})
export class ScheduleEditComponent implements OnInit {
  store = inject(Store);
  selectMedicationId$: Observable<number | null> =
    this.store.select(selectMedicationId);
  selectSchedule$: Observable<ScheduleDTO | null> =
    this.store.select(selectSchedule);

  scheduleForm: FormGroup;
  start_date: FormControl;
  isValidForm: boolean;
  private scheduleId: string | null;
  private medicationId: number | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.scheduleId = this.activatedRoute.snapshot.paramMap.get('id');
    this.start_date = new FormControl();
    this.scheduleForm = this.formBuilder.group({
      start_date: this.start_date
    });
    this.selectSchedule$.subscribe((schedule) => {
      if (schedule) {
        this.scheduleForm.patchValue({
          start_date: schedule.start_date
        });
      }
    });
    this.selectMedicationId$.subscribe((medicationId) => {
      this.medicationId = medicationId;
    });
  }

  ngOnInit(): void {
    if (this.scheduleId) {
      this.store.dispatch(
        ScheduleAction.getScheduleById({ id: this.scheduleId })
      );
    }
  }

  cancelSchedule() {
    if (this.medicationId !== null) {
      this.router.navigateByUrl('/user/medication/edit/' + this.medicationId);
    }
  }

  private getCronExpression(date: Date): string {
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${minute} ${hour} * * *`;
  }

  saveSchedule(): void {
    if (this.scheduleId === null || this.medicationId === null) {
      return;
    }
    this.isValidForm = false;
    if (this.scheduleForm.invalid) {
      return;
    }
    this.isValidForm = true;
    const scheduleData = this.scheduleForm.value;
    const start_date = new Date(scheduleData.start_date);
    const schedule = new ScheduleDTO(
      start_date,
      start_date,
      Number(this.medicationId),
      'daily',
      this.getCronExpression(start_date)
    );
    this.store.dispatch(
      ScheduleAction.updateSchedule({
        id: this.scheduleId,
        schedule: schedule
      })
    );
  }
}
