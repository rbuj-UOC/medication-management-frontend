import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  displayedColumns: string[] = [
    'medication-name',
    'medication-schedules',
    'medication-status',
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
