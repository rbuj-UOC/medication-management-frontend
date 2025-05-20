import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from '../../Shared/Services/shared.service';
import * as UserAction from '../actions';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlApi: string;
  private controller: string;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private store: Store
  ) {
    this.controller = 'users';
    this.urlApi = import.meta.env.NG_APP_MEDICATION_API_URL + this.controller;
  }

  addUserContact(email: string): Observable<UserDTO> {
    return this.http
      .post<UserDTO>(this.urlApi + '/contact', { email: email })
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteUser(): Observable<UserDTO> {
    return this.http
      .delete<UserDTO>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteUserByUserId(userId: string): Observable<UserDTO> {
    return this.http
      .delete<UserDTO>(this.urlApi + '/user/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getUser(): Observable<UserDTO> {
    return this.http
      .get<UserDTO>(this.urlApi + '/user')
      .pipe(catchError(this.sharedService.handleError));
  }

  getUserByUserId(userId: string): Observable<UserDTO> {
    return this.http
      .get<UserDTO>(this.urlApi + '/user/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getUserContacts(): Observable<UserDTO[]> {
    return this.http
      .get<UserDTO[]>(this.urlApi + '/contacts')
      .pipe(catchError(this.sharedService.handleError));
  }

  getUsers(): Observable<UserDTO[]> {
    return this.http
      .get<UserDTO[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  logout() {
    this.store.dispatch(UserAction.logout());
  }

  register(user: UserDTO): Observable<UserDTO> {
    return this.http
      .post<UserDTO>(this.urlApi, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  removeUserContact(email: string): Observable<UserDTO> {
    return this.http
      .delete<UserDTO>(this.urlApi + '/contact', {
        body: { email }
      })
      .pipe(catchError(this.sharedService.handleError));
  }

  updateUser(user: UserDTO): Observable<UserDTO> {
    return this.http
      .put<UserDTO>(this.urlApi, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateUserByUserId(userId: string, user: UserDTO): Observable<UserDTO> {
    return this.http
      .put<UserDTO>(this.urlApi + '/' + userId, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateUserDeviceToken(device_token: string): Observable<UserDTO> {
    return this.http
      .put<UserDTO>(this.urlApi, { device_token: device_token })
      .pipe(catchError(this.sharedService.handleError));
  }
}
