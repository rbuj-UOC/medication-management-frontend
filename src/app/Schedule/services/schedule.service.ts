import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError } from 'rxjs';
import { SharedService } from '../../Shared/Services/shared.service';
import * as ScheduleAction from '../actions';
import { ScheduleDTO } from '../models/schedule.dto';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private urlApi: string;
  private controller: string;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private store: Store
  ) {
    this.controller = 'schedules';
    this.urlApi = 'http://localhost:3000/' + this.controller;
  }

  createSchedule(schedule: ScheduleDTO): Observable<ScheduleDTO> {
    return this.http
      .post<ScheduleDTO>(this.urlApi, schedule)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteSchedule(id: number): Observable<ScheduleDTO> {
    return this.http
      .delete<ScheduleDTO>(this.urlApi + '/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }

  getScheduleById(id: string): Observable<ScheduleDTO> {
    return this.http
      .get<ScheduleDTO>(this.urlApi + '/schedule/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }

  getSchedulesByMedicationId(id: string): Observable<ScheduleDTO[]> {
    return this.http
      .get<ScheduleDTO[]>(this.urlApi + '/medication/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }

  logout() {
    this.store.dispatch(ScheduleAction.logout());
  }

  updateMedication(id: string, schedule: ScheduleDTO): Observable<ScheduleDTO> {
    return this.http
      .put<ScheduleDTO>(this.urlApi + '/' + id, schedule)
      .pipe(catchError(this.sharedService.handleError));
  }
}
