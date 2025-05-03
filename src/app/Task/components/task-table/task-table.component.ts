import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskDTO } from '../../models/task.dto';

@Component({
  selector: 'app-task-table',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent {
  @Input() tasks: TaskDTO[];
  @Output() deleteTaskRequest = new EventEmitter<string>();
  displayedColumns: string[] = ['task-key', 'task-next', 'task-actions'];

  deleteTask(key: string): void {
    const result = confirm('Confirm delete task: ' + key);
    if (result) {
      this.deleteTaskRequest.emit(key);
    }
  }
}
