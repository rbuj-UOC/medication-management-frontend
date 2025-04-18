import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicationDTO } from '../../models/medication.dto';

@Component({
  selector: 'app-medication-card',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './medication-card.component.html',
  styleUrls: ['./medication-card.component.scss']
})
export class MedicationCardComponent {
  @Input() medication: MedicationDTO;
  @Output() deleteMedicationRequest = new EventEmitter<number>();
  @Output() editMedicationRequest = new EventEmitter<number>();

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
