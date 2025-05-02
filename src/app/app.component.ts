import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getMessaging, getToken, onMessage } from '@angular/fire/messaging';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {
  selectAccessToken,
  selectAuthStateLoading,
  selectUserRole
} from './Auth/selectors';
import { AuthService } from './Auth/services/auth.service';
import * as DisplayAction from './Display/actions';
import { selectDisplayIsMobile } from './Display/selectors';
import * as FirebaseAction from './Firebase/actions';
import { selectFirebaseToken } from './Firebase/selectors';
import { selectMedicationStateLoading } from './Medication/selectors';
import * as NotificationAction from './Notification/actions';
import { NotificationDTO } from './Notification/models/notification.dto';
import { selectScheduleStateLoading } from './Schedule/selectors';
import { selectTaskStateLoading } from './Task/selectors';
import * as UserAction from './User/actions';
import { UserDTO } from './User/models/user.dto';
import { selectUser, selectUserStateLoading } from './User/selectors';

@Component({
  selector: 'app-root',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  store = inject(Store);
  isMobile$: Observable<boolean> = this.store.select(selectDisplayIsMobile);
  selectAccessToken$: Observable<string | null> =
    this.store.select(selectAccessToken);
  selectFirebaseToken$: Observable<string | null> =
    this.store.select(selectFirebaseToken);
  showLoadingAuth$: Observable<boolean> = this.store.select(
    selectAuthStateLoading
  );
  showLoadingMedication$: Observable<boolean> = this.store.select(
    selectMedicationStateLoading
  );
  showLoadingSchedule$: Observable<boolean> = this.store.select(
    selectScheduleStateLoading
  );
  showLoadingTask$: Observable<boolean> = this.store.select(
    selectTaskStateLoading
  );
  showLoadingUser$: Observable<boolean> = this.store.select(
    selectUserStateLoading
  );
  selectUser$: Observable<UserDTO | null> = this.store.select(selectUser);
  selectUserRole$: Observable<string | null> =
    this.store.select(selectUserRole);

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isCollapsed = true;
  isMobile = true;
  messaging: any;
  localDeviceToken: string;
  remoteDeviceToken: string;
  user_role: string | null;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isMobile$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });

    this.observer.observe([Breakpoints.XSmall]).subscribe((result) => {
      if (result.matches) {
        this.store.dispatch(DisplayAction.setIsMobile());
      }
    });

    this.observer
      .observe([Breakpoints.Small, Breakpoints.Medium])
      .subscribe((result) => {
        if (result.matches) {
          this.store.dispatch(DisplayAction.setIsTablet());
        }
      });

    this.observer
      .observe([Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((result) => {
        if (result.matches) {
          this.store.dispatch(DisplayAction.setIsDesktop());
        }
      });

    this.selectAccessToken$.subscribe((access_token) => {
      if (access_token) {
        this.store.dispatch(UserAction.getUser());
      }
    });

    this.selectUserRole$.subscribe((user_role) => {
      this.user_role = user_role;
    });

    this.selectUser$.subscribe((user) => {
      if (user) {
        this.remoteDeviceToken = user.device_token;
        if (
          user.role === 'user' &&
          this.localDeviceToken !== user.device_token
        ) {
          this.store.dispatch(
            UserAction.updateUserDeviceToken({
              device_token: this.localDeviceToken
            })
          );
        }
      }
    });

    this.selectFirebaseToken$.subscribe((token) => {
      this.localDeviceToken = token;
      if (this.user_role === 'user' && token !== this.remoteDeviceToken) {
        this.store.dispatch(
          UserAction.updateUserDeviceToken({
            device_token: this.localDeviceToken
          })
        );
      }
    });

    const app = initializeApp(environment.firebaseConfig);
    this.messaging = getMessaging(app);
    this.saveMessagingDeviceToken();
    onMessage(this.messaging, (payload) => {
      const newNotification = new NotificationDTO(
        payload.messageId,
        payload.notification.title,
        payload.notification.body
      );
      this.store.dispatch(
        NotificationAction.addNotification({ notification: newNotification })
      );
    });
  }

  adminDashboard(): void {
    this.router.navigateByUrl('admin/dashboard');
  }

  adminTasks(): void {
    this.router.navigateByUrl('admin/task/list');
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
    this.authService.logout();
  }

  profile(): void {
    this.router.navigateByUrl('profile');
  }

  register(): void {
    this.router.navigateByUrl('register');
  }

  async saveMessagingDeviceToken() {
    const currentToken = await getToken(this.messaging);
    if (currentToken) {
      this.store.dispatch(FirebaseAction.setToken({ token: currentToken }));
    } else {
      // Need to request permissions to show notifications.
      this.requestNotificationsPermissions();
    }
  }

  requestNotificationsPermissions = async () => {
    console.log('Requesting notifications permission...');
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // Notification permission granted.
      await this.saveMessagingDeviceToken();
    } else {
      console.log('Unable to get permission to notify.');
    }
  };

  userContacts(): void {
    this.router.navigateByUrl('user/contact/list');
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
