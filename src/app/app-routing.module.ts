import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HelpComponent } from './components/help/help.component';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TermsComponent } from './components/terms/terms.component';
import { TodayListComponent } from './components/today-list/today-list.component';
import { LandingComponent } from './Landing/components/landing.component';
import { MedicationFormComponent } from './Medication/components/medication-form/medication-form.component';
import { MedicationListComponent } from './Medication/components/medication-list/medication-list.component';
import { ScheduleFormComponent } from './Schedule/components/schedule-form/schedule-form.component';
import { ScheduleListComponent } from './Schedule/components/schedule-list/schedule-list.component';
import { AuthGuard } from './Shared/Guards/auth.guard';
import { ProfileComponent } from './User/components/profile/profile.component';
import { RegisterComponent } from './User/components/register/register.component';
import { UserListComponent } from './User/components/user-list/user-list.component';

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
    path: 'admin/task/list',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/user/list',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'help',
    component: HelpComponent
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
    path: 'privacy',
    component: PrivacyComponent
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
    path: 'terms',
    component: TermsComponent
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
    path: 'user/medication/form/:id',
    component: MedicationFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/medication/list',
    component: MedicationListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/schedule/form/:id',
    component: ScheduleFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/schedule/list/:id',
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
