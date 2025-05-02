import { Component, OnInit } from '@angular/core';
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
import * as UserAction from '../../../User/actions';
import * as MedicationsAction from '../../actions';

@Component({
  selector: 'app-medication-new',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './medication-new.component.html',
  styleUrls: ['./medication-new.component.scss']
})
export class MedicationNewComponent implements OnInit {
  medicationForm: FormGroup;
  isValidForm: boolean | null;
  name: FormControl;
  private userId$: Observable<string | null>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.isValidForm = null;
    this.name = new FormControl('', [
      Validators.required,
      Validators.maxLength(55)
    ]);
    this.medicationForm = this.formBuilder.group({
      name: this.name
    });
    this.userId$ = this.store.select(selectUserId);
  }

  ngOnInit(): void {
    this.medicationForm.reset();
    this.store.dispatch(UserAction.getUser());
  }

  cancelMedication() {
    this.router.navigateByUrl('/user/medication/list');
  }

  saveMedication(): void {
    this.isValidForm = false;
    if (this.medicationForm.invalid) {
      return;
    }
    this.isValidForm = true;
    const medication = this.medicationForm.value;
    if (this.userId$ === null) {
      return;
    }
    medication.user_id = this.userId$;
    this.store.dispatch(MedicationsAction.createMedication({ medication }));
  }
}
