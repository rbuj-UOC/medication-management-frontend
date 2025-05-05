import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { ScheduleCardComponent } from './components/schedule-card/schedule-card.component';
import { ScheduleEditComponent } from './components/schedule-edit/schedule-edit.component';
import { ScheduleGridComponent } from './components/schedule-grid/schedule-grid.component';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { ScheduleNewComponent } from './components/schedule-new/schedule-new.component';
import { ScheduleTableComponent } from './components/schedule-table/schedule-table.component';
import { TodayListComponent } from './components/today-list/today-list.component';

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
    MatTimepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    ScheduleCardComponent,
    ScheduleEditComponent,
    ScheduleGridComponent,
    ScheduleListComponent,
    ScheduleNewComponent,
    ScheduleTableComponent,
    TodayListComponent
  ],
  exports: [ScheduleListComponent]
})
export class ScheduleModule {}
