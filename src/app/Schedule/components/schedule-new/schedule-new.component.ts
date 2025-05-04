import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectMedicationId } from '../../../Medication/selectors/medication.selector';
import * as ScheduleAction from '../../actions';
import { ScheduleDTO } from '../../models/schedule.dto';

@Component({
  selector: 'app-schedule-new',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './schedule-new.component.html',
  styleUrls: ['./schedule-new.component.scss']
})
export class ScheduleNewComponent implements OnInit {
  store = inject(Store);
  selectMedicationId$: Observable<number | null> =
    this.store.select(selectMedicationId);

  scheduleForm: FormGroup;
  start_date: FormControl;
  isValidForm: boolean;
  private medicationId: number | null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.start_date = new FormControl(new Date());
    this.scheduleForm = this.formBuilder.group({
      start_date: this.start_date
    });
    this.selectMedicationId$.subscribe((medicationId) => {
      this.medicationId = medicationId;
    });
  }

  ngOnInit(): void {
    this.scheduleForm.reset();
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
    if (this.medicationId === null) {
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
    this.store.dispatch(ScheduleAction.createSchedule({ schedule }));
  }
}
