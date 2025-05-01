import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../../Auth/selectors';
import * as MedicationsAction from '../../actions';
import { MedicationDTO } from '../../models/medication.dto';
import { selectMedication } from '../../selectors/medication.selector';

@Component({
  selector: 'app-medication-form',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './medication-form.component.html',
  styleUrls: ['./medication-form.component.scss']
})
export class MedicationFormComponent implements OnInit {
  medication: MedicationDTO;
  medicationForm: FormGroup;
  isValidForm: boolean | null;
  name: FormControl;
  isUpdateMode: boolean;
  private userId: string | null;
  private medicationId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.isValidForm = null;
    this.medicationId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isUpdateMode = false;
    this.medication = new MedicationDTO('');

    this.name = new FormControl(this.medication.name, [
      Validators.required,
      Validators.maxLength(55)
    ]);

    this.medicationForm = this.fb.group({
      name: this.name
    });

    this.store.select(selectUserId).subscribe((user_id) => {
      if (user_id) {
        this.userId = user_id;
      }
    });

    this.store.select(selectMedication).subscribe((medication) => {
      this.medication = medication;
      this.name.setValue(this.medication.name);
    });
  }

  ngOnInit(): void {
    if (this.medicationId) {
      this.isUpdateMode = true;
      this.store.dispatch(
        MedicationsAction.getMedicationById({ id: this.medicationId })
      );
    } else {
      this.medicationForm.reset();
    }
  }

  cancelMedication() {
    this.router.navigateByUrl('/user/medication/list');
  }

  createMedication() {
    this.medication.user_id = this.userId;
    this.store.dispatch(
      MedicationsAction.createMedication({ medication: this.medication })
    );
  }

  editMedication() {
    if (this.userId && this.medicationId) {
      this.medication.user_id = this.userId;
      this.store.dispatch(
        MedicationsAction.updateMedication({
          id: this.medicationId,
          medication: this.medication
        })
      );
    }
  }

  saveMedication(): void {
    this.isValidForm = false;
    if (this.medicationForm.invalid) {
      return;
    }
    this.isValidForm = true;
    this.medication = this.medicationForm.value;
    if (this.isUpdateMode) {
      this.editMedication();
    } else {
      this.createMedication();
    }
  }
}
