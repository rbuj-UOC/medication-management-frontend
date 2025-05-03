import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDisplayIsMobile } from '../../../Display/selectors';
import { MedicationDTO } from '../../models/medication.dto';

@Component({
  selector: 'app-medication-table',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './medication-table.component.html',
  styleUrls: ['./medication-table.component.scss']
})
export class MedicationTableComponent {
  @Input() medications: MedicationDTO[];
  @Output() createMedicationRequest = new EventEmitter<void>();
  @Output() deleteMedicationRequest = new EventEmitter<number>();
  @Output() editMedicationRequest = new EventEmitter<number>();

  store = inject(Store);
  isMobile$: Observable<boolean> = this.store.select(selectDisplayIsMobile);
  displayedColumns: string[] = [
    'medication-name',
    'medication-schedules',
    'medication-actions'
  ];

  createMedication(): void {
    this.createMedicationRequest.emit();
  }

  deleteMedication(id: number, name: string): void {
    const result = confirm('Confirm delete medication: ' + name);
    if (result) {
      this.deleteMedicationRequest.emit(id);
    }
  }

  editMedication(id: number): void {
    this.editMedicationRequest.emit(id);
  }
}
