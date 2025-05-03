import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicationDTO } from '../../models/medication.dto';

@Component({
  selector: 'app-medication-grid',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './medication-grid.component.html',
  styleUrls: ['./medication-grid.component.scss']
})
export class MedicationGridComponent {
  @Input() medications: MedicationDTO[];
  @Output() createMedicationRequest = new EventEmitter<void>();
  @Output() deleteMedicationRequest = new EventEmitter<number>();
  @Output() editMedicationRequest = new EventEmitter<number>();

  createMedication(): void {
    this.createMedicationRequest.emit();
  }

  deleteMedication(id: number): void {
    this.deleteMedicationRequest.emit(id);
  }

  editMedication(id: number): void {
    this.editMedicationRequest.emit(id);
  }
}
