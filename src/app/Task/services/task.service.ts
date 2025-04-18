import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from '../../Shared/Services/shared.service';
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
    this.urlApi = import.meta.env.NG_APP_MEDICATION_API_URL + this.controller;
  }

  getTasks(): Observable<TaskDTO[]> {
    return this.http
      .get<TaskDTO[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteTask(id: string): Observable<TaskDTO> {
    return this.http
      .delete<TaskDTO>(this.urlApi + '/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }

  logout() {
    this.store.dispatch(TaskAction.logout());
  }
}
