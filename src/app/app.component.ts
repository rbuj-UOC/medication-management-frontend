import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getMessaging, getToken, onMessage } from '@angular/fire/messaging';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '../environments/environment';
import { selectAccessToken, selectAuthStateLoading } from './Auth/selectors';
import { AuthService } from './Auth/services/auth.service';
import * as DisplayAction from './Display/display.actions';
import {
  selectDisplayIsDesktop,
  selectDisplayIsMobile
} from './Display/display.selector';
import * as FirebaseAction from './Firebase/firebase.actions';
import { selectFirebaseToken } from './Firebase/firebase.selector';
import { selectMedicationStateLoading } from './Medication/selectors';
import * as NotificationAction from './Notification/actions';
import { NotificationDTO } from './Notification/models/notification.dto';
import { selectNotificationStateLoading } from './Notification/selectors';
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
  title = 'frontend';
  showAuthSection: boolean;
  showNoAuthSection: boolean;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isCollapsed = true;

  showLoadingAuth$: any;
  showLoadingMedication$: any;
  showLoadingNotification$: any;
  showLoadingSchedule$: any;
  showLoadingTask$: any;
  showLoadingUser$: any;

  showAdminSection: boolean;
  showUserSection: boolean;

  isMobile$: any;
  isMobile = true;

  isDesktop$: any;
  isTablet$: any;

  isDesktop: boolean;
  isTablet: boolean;

  messaging: any;
  localDeviceToken: string;
  remoteDeviceToken: string;

  user_role: string;
  userId: string;
  user: UserDTO | null;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private store: Store,
    private authService: AuthService
  ) {
    this.showAuthSection = false;
    this.showNoAuthSection = true;
    this.showUserSection = false;
    this.showAdminSection = false;

    this.showLoadingAuth$ = this.store.select(selectAuthStateLoading);
    this.showLoadingMedication$ = this.store.select(
      selectMedicationStateLoading
    );
    this.showLoadingNotification$ = this.store.select(
      selectNotificationStateLoading
    );
    this.showLoadingSchedule$ = this.store.select(selectScheduleStateLoading);
    this.showLoadingTask$ = this.store.select(selectTaskStateLoading);
    this.showLoadingUser$ = this.store.select(selectUserStateLoading);
  }

  ngOnInit(): void {
    this.isMobile$ = this.store.select(selectDisplayIsMobile);
    this.isTablet$ = this.store.select(selectDisplayIsDesktop);
    this.isDesktop$ = this.store.select(selectDisplayIsDesktop);

    this.isMobile$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
    this.isDesktop$.subscribe((isDesktop: boolean) => {
      this.isDesktop = isDesktop;
    });
    this.isTablet$.subscribe((isTablet: boolean) => {
      this.isTablet = isTablet;
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

    this.store.select(selectAccessToken).subscribe((access_token) => {
      if (access_token) {
        this.showAuthSection = true;
        this.showNoAuthSection = false;
        this.store.dispatch(UserAction.getUser());
      } else {
        this.showAuthSection = false;
        this.showNoAuthSection = true;
      }
    });

    this.store.select(selectUser).subscribe((user) => {
      if (user) {
        this.user = user;
        this.user_role = user.role;
        this.remoteDeviceToken = user.device_token;
        const localDeviceToken = this.localDeviceToken;
        if (
          this.user_role === 'user' &&
          localDeviceToken !== user.device_token
        ) {
          this.store.dispatch(
            UserAction.updateUserDeviceToken({
              device_token: localDeviceToken
            })
          );
        }
      }
    });

    this.store.select(selectFirebaseToken).subscribe((token) => {
      this.localDeviceToken = token;
      const remoteDeviceToken = this.remoteDeviceToken;
      if (
        this.user &&
        this.user.role === 'user' &&
        this.localDeviceToken !== remoteDeviceToken
      ) {
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
