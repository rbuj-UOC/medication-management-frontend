import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError } from 'rxjs';
import { SharedService } from '../../Shared/Services/shared.service';
import * as ScheduleAction from '../actions';
import { ScheduleDTO } from '../models/schedule.dto';
import { TodayDTO } from '../models/today.dto';

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
    this.urlApi = import.meta.env.NG_APP_MEDICATION_API_URL + this.controller;
  }

  createSchedule(sch: ScheduleDTO): Observable<ScheduleDTO> {
    const schedule = {
      medication_id: sch.medication_id,
      start_date: sch.start_date.toISOString(),
      time: formatDate(sch.time, 'HH:mm:ss', 'en-US'),
      frequency: sch.frequency,
      cron_expression: sch.cron_expression
    };
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

  getToday(): Observable<TodayDTO[]> {
    return this.http
      .get<TodayDTO[]>(this.urlApi + '/today')
      .pipe(catchError(this.sharedService.handleError));
  }

  logout() {
    this.store.dispatch(ScheduleAction.logout());
  }

  updateSchedule(id: string, schedule: ScheduleDTO): Observable<ScheduleDTO> {
    const sch = {
      medicationId: schedule.medication_id,
      start_date: schedule.start_date.toISOString(),
      time: formatDate(schedule.time, 'HH:mm:ss', 'en-US'),
      frequency: schedule.frequency,
      cron_expression: schedule.cron_expression
    };
    return this.http
      .put<ScheduleDTO>(this.urlApi + '/' + id, sch)
      .pipe(catchError(this.sharedService.handleError));
  }
}
