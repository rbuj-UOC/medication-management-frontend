import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { SharedService } from '../../Shared/Services/shared.service';
import { MedicationDTO } from '../models/medication.dto';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private urlApi: string;
  private controller: string;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) {
    this.controller = 'medications';
    this.urlApi = 'http://localhost:3000/' + this.controller;
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

  getMedicationById(id: string): Observable<MedicationDTO> {
    return this.http
      .get<MedicationDTO>(this.urlApi + '/medication/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }

  getMedicationsByUserId(userId: string): Observable<MedicationDTO[]> {
    return this.http
      .get<MedicationDTO[]>(this.urlApi + '/user/' + userId)
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
