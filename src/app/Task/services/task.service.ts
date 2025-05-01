import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from '../../Shared/services/shared.service';
import * as TaskAction from '../actions';
import { TaskDTO } from '../models/task.dto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private urlApi: string;
  private controller: string;

  constructor(
    private store: Store,
    private http: HttpClient,
    private sharedService: SharedService
  ) {
    this.controller = 'tasks';
    this.urlApi = 'http://localhost:3000/' + this.controller;
  }

  getTasks(): Observable<TaskDTO[]> {
    return this.http
      .get<TaskDTO[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  logout() {
    this.store.dispatch(TaskAction.logout());
  }
}
