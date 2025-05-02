import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserId } from '../../../Auth/selectors';
import * as MedicationsAction from '../../actions';
import { MedicationDTO } from '../../models/medication.dto';

@Component({
  selector: 'app-medication-new',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './medication-new.component.html',
  styleUrls: ['./medication-new.component.scss']
})
export class MedicationNewComponent implements OnInit {
  store = inject(Store);
  private selectUserId$: Observable<string | null> =
    this.store.select(selectUserId);
  private userId: string | null;
  medicationForm: FormGroup;
  isValidForm: boolean | null;
  name: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.isValidForm = null;
    this.name = new FormControl('', [
      Validators.required,
      Validators.maxLength(55)
    ]);
    this.medicationForm = this.formBuilder.group({
      name: this.name
    });
    this.selectUserId$.subscribe((userId) => {
      this.userId = userId;
    });
  }

  ngOnInit(): void {
    this.medicationForm.reset();
  }

  cancelMedication() {
    this.router.navigateByUrl('/user/medication/list');
  }

  saveMedication(): void {
    if (this.userId === null) {
      return;
    }
    this.isValidForm = false;
    if (this.medicationForm.invalid) {
      return;
    }
    this.isValidForm = true;
    const medication: MedicationDTO = this.medicationForm.value;
    medication.user_id = this.userId;
    this.store.dispatch(MedicationsAction.createMedication({ medication }));
  }
}
