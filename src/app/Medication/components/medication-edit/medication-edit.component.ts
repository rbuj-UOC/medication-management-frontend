import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserId } from '../../../Auth/selectors';
import * as MedicationsAction from '../../actions';
import { MedicationDTO } from '../../models/medication.dto';
import { selectMedication } from '../../selectors/medication.selector';

@Component({
  selector: 'app-medication-edit',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './medication-edit.component.html',
  styleUrls: ['./medication-edit.component.scss']
})
export class MedicationEditComponent implements OnInit {
  store = inject(Store);
  selectMedication$: Observable<MedicationDTO | null> =
    this.store.select(selectMedication);
  private selectUserId$: Observable<string | null> =
    this.store.select(selectUserId);

  medicationForm: FormGroup;
  isValidForm: boolean | null;
  name: FormControl;
  private medicationId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.isValidForm = null;
    this.medicationId = this.activatedRoute.snapshot.paramMap.get('id');
    this.name = new FormControl('', [
      Validators.required,
      Validators.maxLength(55)
    ]);
    this.medicationForm = this.formBuilder.group({
      name: this.name
    });
    this.selectMedication$.subscribe((medication) => {
      if (medication) {
        this.medicationForm.patchValue({
          name: medication.name
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.medicationId !== null) {
      this.store.dispatch(
        MedicationsAction.getMedicationById({ id: this.medicationId })
      );
    }
  }

  cancelMedication() {
    this.router.navigateByUrl('/user/medication/list');
  }

  saveMedication(): void {
    if (this.selectUserId$ === null || this.medicationId === null) {
      return;
    }
    this.isValidForm = false;
    if (this.medicationForm.invalid) {
      return;
    }
    this.isValidForm = true;
    const medication = this.medicationForm.value;
    medication.user_id = this.selectUserId$;
    this.store.dispatch(
      MedicationsAction.updateMedication({
        id: this.medicationId,
        medication: medication
      })
    );
  }
}
