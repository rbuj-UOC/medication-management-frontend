import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
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
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducers, EffectsArray } from './app.reducers';
import { AuthModule } from './Auth/auth.module';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TodayListComponent } from './components/today-list/today-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LandingModule } from './Landing/landing.module';
import { MedicationModule } from './Medication/medication.module';
import { SpinnerComponent } from './Shared/Components/spinner/spinner.component';
import { AuthInterceptorService } from './Shared/Services/auth-interceptor.service';
import { ScheduleModule } from './Shedule/shedule.module';
import { UserModule } from './User/user.module';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    TodayListComponent,
    DashboardComponent,
    HistoryListComponent,
    ContactListComponent,
    UserListComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    UserModule,
    LandingModule,
    MedicationModule,
    ScheduleModule,
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
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
