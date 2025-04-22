import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { TodayListComponent } from './components/today-list/today-list.component';
import { LandingComponent } from './Landing/components/landing.component';
import { MedicationFormComponent } from './Medication/components/medication-form/medication-form.component';
import { MedicationListComponent } from './Medication/components/medication-list/medication-list.component';
import { AuthGuard } from './Shared/Guards/auth.guard';
import { ScheduleListComponent } from './Shedule/components/schedule-list/schedule-list.component';
import { ProfileComponent } from './User/components/profile/profile.component';
import { RegisterComponent } from './User/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'user/contacts',
    component: ContactListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/history',
    component: HistoryListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/medication/:id',
    component: MedicationFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/medications',
    component: MedicationListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/schedules/:id',
    component: ScheduleListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/today',
    component: TodayListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
