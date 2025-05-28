import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAccessToken } from '../../Auth/selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  store = inject(Store);
  selectAccessToken$ = this.store.select(selectAccessToken);
  private access_token = '';

  constructor() {
    this.selectAccessToken$.subscribe((access_token) => {
      this.access_token = '';
      if (access_token) {
        this.access_token = access_token;
      }
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.access_token) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${this.access_token}`
        }
      });
    }

    return next.handle(req);
  }
}
