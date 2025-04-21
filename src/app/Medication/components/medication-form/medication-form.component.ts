import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
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
  private isUpdateMode: boolean;
  private medicationId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
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

    this.store.select(selectMedication).subscribe((medication) => {
      this.medication = medication;
      this.name.setValue(this.medication.name);
    });
  }

  ngOnInit(): void {
    if (this.medicationId) {
      this.isUpdateMode = true;
    } else {
      this.medicationForm.reset();
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

  createMedication() {
    this.store.dispatch(
      MedicationsAction.createMedication({ medication: this.medication })
    );
  }

  editMedication() {
    throw new Error('Method not implemented.');
  }
}
