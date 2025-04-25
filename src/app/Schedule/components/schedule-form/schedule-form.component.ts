import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectMedicationId } from '../../../Medication/selectors/medication.selector';
import * as ScheduleAction from '../../actions';
import { ScheduleDTO } from '../../models/schedule.dto';

@Component({
  selector: 'app-schedule-form',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit {
  scheduleForm: FormGroup;
  start_date: FormControl;
  isValidForm: boolean;
  isUpdateMode: boolean;
  schedule: ScheduleDTO;
  private scheduleId: number | null;
  private medicationId: number | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.store.select(selectMedicationId).subscribe((medicationId) => {
      if (medicationId) {
        this.medicationId = medicationId;
      }
    });
    this.isUpdateMode = false;
    this.start_date = new FormControl();

    this.scheduleForm = this.fb.group({
      start_date: this.start_date
    });
  }

  ngOnInit(): void {
    if (this.scheduleId) {
      this.isUpdateMode = true;
    } else {
      this.scheduleForm.reset();
    }
  }

  saveSchedule(): void {
    this.isValidForm = false;

    if (this.scheduleForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.schedule = this.scheduleForm.value;
    this.schedule.medication_id = this.medicationId;
    this.schedule.hour = this.schedule.start_date.getHours();
    this.schedule.minute = this.schedule.start_date.getMinutes();
    this.schedule.cron_expression = '* * * * *';
    this.schedule.frequency = 'daily';

    if (this.isUpdateMode) {
      this.editSchedule();
    } else {
      this.createSchedule();
    }
  }

  createSchedule() {
    this.store.dispatch(
      ScheduleAction.createSchedule({ schedule: this.schedule })
    );
  }

  editSchedule() {
    throw new Error('Method not implemented.');
  }

  cancelSchedule() {
    this.router.navigateByUrl('/user/medication/form/' + this.medicationId);
  }
}
