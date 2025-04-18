import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducers, EffectsArray } from './app.reducers';
import { AuthModule } from './Auth/auth.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { MedicationModule } from './Medication/medication.module';
import { NotificationModule } from './Notification/notification.module';
import { ScheduleModule } from './Schedule/schedule.module';
import { HelpComponent } from './Shared/Components/help/help.component';
import { LandingComponent } from './Shared/Components/landing/landing.component';
import { PrivacyComponent } from './Shared/Components/privacy/privacy.component';
import { SpinnerComponent } from './Shared/Components/spinner/spinner.component';
import { TermsComponent } from './Shared/Components/terms/terms.component';
import { AuthInterceptorService } from './Shared/Services/auth-interceptor.service';
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
    MatCardModule,
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
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
