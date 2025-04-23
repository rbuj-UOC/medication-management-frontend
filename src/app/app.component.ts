import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthAction from './Auth/actions';
import {
  selectAccessToken,
  selectAuthStateLoading,
  selectUserRole
} from './Auth/selectors';
import { selectUserStateLoading } from './User/selectors';

@Component({
  selector: 'app-root',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  showAuthSection: boolean;
  showNoAuthSection: boolean;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  showLoadingAuth$: any;
  showLoadingUser$: any;
  showAdminSection: boolean;
  showUserSection: boolean;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private store: Store
  ) {
    this.showAuthSection = false;
    this.showNoAuthSection = true;
    this.showUserSection = false;
    this.showAdminSection = false;
    this.showLoadingAuth$ = this.store.select(selectAuthStateLoading);
    this.showLoadingUser$ = this.store.select(selectUserStateLoading);
  }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 740px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.store.select(selectAccessToken).subscribe((access_token) => {
      if (access_token) {
        this.showAuthSection = true;
        this.showNoAuthSection = false;
      } else {
        this.showAuthSection = false;
        this.showNoAuthSection = true;
      }
    });

    this.store.select(selectUserRole).subscribe((user_role) => {
      if (user_role === 'admin') {
        this.showAdminSection = true;
        this.showUserSection = false;
      } else if (user_role === 'user') {
        this.showAdminSection = false;
        this.showUserSection = true;
      } else {
        this.showAdminSection = false;
        this.showUserSection = false;
      }
    });
  }

  adminDashboard(): void {
    this.router.navigateByUrl('admin/dashboard');
  }

  adminTasks(): void {
    this.router.navigateByUrl('admin/tasks');
  }

  adminUsers(): void {
    this.router.navigateByUrl('admin/user/list');
  }

  landing(): void {
    this.router.navigateByUrl('landing');
  }

  login(): void {
    this.router.navigateByUrl('login');
  }

  logout(): void {
    this.store.dispatch(AuthAction.logout());
    this.router.navigateByUrl('landing');
  }

  profile(): void {
    this.router.navigateByUrl('profile');
  }

  register(): void {
    this.router.navigateByUrl('register');
  }

  userContacts(): void {
    this.router.navigateByUrl('user/contacts');
  }

  userHistory(): void {
    this.router.navigateByUrl('user/history');
  }

  userToday(): void {
    this.router.navigateByUrl('user/today');
  }

  userMedications(): void {
    this.router.navigateByUrl('user/medication/list');
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
