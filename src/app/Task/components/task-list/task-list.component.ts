import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as TaskAction from '../../actions';
import { TaskDTO } from '../../models/task.dto';
import { selectTasks } from '../../selectors';

@Component({
  selector: 'app-task-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks: TaskDTO[];
  displayedColumns: string[] = ['task-key', 'task-next', 'task-actions'];

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.store.select(selectTasks).subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.loadTasks();
  }

  private loadTasks(): void {
    this.store.dispatch(TaskAction.getTasks());
  }

  deleteTask(key: string): void {
    throw new Error('Method not implemented.');
  }
}
