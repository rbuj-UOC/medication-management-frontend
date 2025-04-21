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
}
