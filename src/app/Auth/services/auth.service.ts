import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from '../../Shared/Services/shared.service';
import * as AuthAction from '../actions';
import { AuthDTO } from '../models/auth.dto';

export interface AuthToken {
  user_id: string;
  user_role: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlBlogUocApi: string;
  private controller: string;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router,
    private store: Store
  ) {
    this.controller = 'auth';
    this.urlBlogUocApi =
      import.meta.env.NG_APP_MEDICATION_API_URL + this.controller;
  }

  login(auth: AuthDTO): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(this.urlBlogUocApi, auth)
      .pipe(catchError(this.sharedService.handleError));
  }

  logout(): void {
    this.store.dispatch(AuthAction.logout());
    this.router.navigateByUrl('landing');
  }
}
