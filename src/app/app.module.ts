import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducers, EffectsArray } from './app.reducers';
import { AuthModule } from './Auth/auth.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { MedicationModule } from './Medication/medication.module';
import { NotificationModule } from './Notification/notification.module';
import { ScheduleModule } from './Schedule/schedule.module';
import { HelpComponent } from './Shared/components/help/help.component';
import { LandingComponent } from './Shared/components/landing/landing.component';
import { PrivacyComponent } from './Shared/components/privacy/privacy.component';
import { SpinnerComponent } from './Shared/components/spinner/spinner.component';
import { TermsComponent } from './Shared/components/terms/terms.component';
import { AuthInterceptorService } from './Shared/services/auth-interceptor.service';
import { TaskModule } from './Task/task.module';
import { UserModule } from './User/user.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HelpComponent,
    HistoryListComponent,
    LandingComponent,
    PrivacyComponent,
    SpinnerComponent,
    TermsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    UserModule,
    MedicationModule,
    NotificationModule,
    ScheduleModule,
    TaskModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    EffectsModule.forRoot(EffectsArray),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode()
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideMessaging(() => getMessaging())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
