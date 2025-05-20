import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { MedicationEditComponent } from './Medication/components/medication-edit/medication-edit.component';
import { MedicationListComponent } from './Medication/components/medication-list/medication-list.component';
import { MedicationNewComponent } from './Medication/components/medication-new/medication-new.component';
import { ScheduleEditComponent } from './Schedule/components/schedule-edit/schedule-edit.component';
import { ScheduleListComponent } from './Schedule/components/schedule-list/schedule-list.component';
import { ScheduleNewComponent } from './Schedule/components/schedule-new/schedule-new.component';
import { TodayListComponent } from './Schedule/components/today-list/today-list.component';
import { HelpComponent } from './Shared/Components/help/help.component';
import { LandingComponent } from './Shared/Components/landing/landing.component';
import { PrivacyComponent } from './Shared/Components/privacy/privacy.component';
import { TermsComponent } from './Shared/Components/terms/terms.component';
import { AuthGuard } from './Shared/Guards/auth.guard';
import { TaskListComponent } from './Task/components/task-list/task-list.component';
import { ContactFormComponent } from './User/components/contact-form/contact-form.component';
import { ContactListComponent } from './User/components/contact-list/contact-list.component';
import { ProfileComponent } from './User/components/profile/profile.component';
import { RegisterComponent } from './User/components/register/register.component';
import { UserFormComponent } from './User/components/user-form/user-form.component';
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
    path: 'user/contact/form',
    component: ContactFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/contact/list',
    component: ContactListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/edit/:id',
    component: UserFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/history',
    component: HistoryListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/medication/new',
    component: MedicationNewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/medication/edit/:id',
    component: MedicationEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/medication/list',
    component: MedicationListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/schedule/new/',
    component: ScheduleNewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/schedule/edit/:id',
    component: ScheduleEditComponent,
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
