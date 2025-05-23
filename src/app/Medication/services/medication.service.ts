import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable } from 'rxjs';
import { SharedService } from '../../Shared/Services/shared.service';
import * as MedicationAction from '../actions';
import { ActiveMedicationStats } from '../interfaces/active-medication-stats.interface';
import { MedicationDTO } from '../models/medication.dto';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private urlApi: string;
  private controller: string;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private store: Store
  ) {
    this.controller = 'medications';
    this.urlApi = import.meta.env.NG_APP_MEDICATION_API_URL + this.controller;
  }

  createMedication(medication: MedicationDTO): Observable<MedicationDTO> {
    return this.http
      .post<MedicationDTO>(this.urlApi, medication)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteMedication(id: number): Observable<MedicationDTO> {
    return this.http
      .delete<MedicationDTO>(this.urlApi + '/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }

  getActiveMedicationStats(): Observable<ActiveMedicationStats> {
    return this.http
      .get<ActiveMedicationStats>(this.urlApi + '/stats/active')
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllMedications() {
    return this.http
      .get<MedicationDTO[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getMedicationById(id: string): Observable<MedicationDTO> {
    return this.http
      .get<MedicationDTO>(this.urlApi + '/medication/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }

  getMedications(): Observable<MedicationDTO[]> {
    return this.http
      .get<MedicationDTO[]>(this.urlApi + '/user')
      .pipe(catchError(this.sharedService.handleError));
  }

  logout() {
    this.store.dispatch(MedicationAction.logout());
  }

  resumeMedication(id: number): Observable<MedicationDTO> {
    return this.http
      .put<MedicationDTO>(this.urlApi + '/' + id, { disabled: false })
      .pipe(catchError(this.sharedService.handleError));
  }

  pauseMedication(id: number): Observable<MedicationDTO> {
    return this.http
      .put<MedicationDTO>(this.urlApi + '/' + id, { disabled: true })
      .pipe(catchError(this.sharedService.handleError));
  }

  updateMedication(
    id: string,
    medication: MedicationDTO
  ): Observable<MedicationDTO> {
    return this.http
      .put<MedicationDTO>(this.urlApi + '/' + id, medication)
      .pipe(catchError(this.sharedService.handleError));
  }
}
