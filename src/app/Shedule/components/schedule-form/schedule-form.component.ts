import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ScheduleDTO } from '../../models/schedule.dto';

@Component({
  selector: 'app-medication-list',
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
  medicationId: string | null;
  schedule: ScheduleDTO;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.isUpdateMode = false;
    this.start_date = new FormControl();

    this.scheduleForm = this.fb.group({
      start_date: this.start_date
    });
  }

  ngOnInit(): void {
    if (this.medicationId) {
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
    this.schedule.hour = this.schedule.start_date.getHours();
    this.schedule.minute = this.schedule.start_date.getMinutes();

    if (this.isUpdateMode) {
      this.editSchedule();
    } else {
      this.createSchedule();
    }
  }

  createSchedule() {
    console.log('Editing schedule:', this.schedule);
    throw new Error('Method not implemented.');
  }

  editSchedule() {
    throw new Error('Method not implemented.');
  }
}
