import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAccessToken } from '../../Auth/selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  store = inject(Store);
  selectAccessToken$: Observable<string | null> =
    this.store.select(selectAccessToken);
  private access_token: string | null = null;

  constructor(private router: Router) {
    this.selectAccessToken$.subscribe((access_token) => {
      this.access_token = access_token;
    });
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.access_token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
