import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ScheduleModule } from '../Schedule/schedule.module';
import { MedicationFormComponent } from './components/medication-form/medication-form.component';
import { MedicationListComponent } from './components/medication-list/medication-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    ScheduleModule
  ],
  declarations: [MedicationListComponent, MedicationFormComponent]
})
export class MedicationModule {}
