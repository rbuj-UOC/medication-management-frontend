import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login.component';
import { LandingComponent } from './Landing/components/landing.component';
import { MedicationFormComponent } from './Medication/components/medication-form/medication-form.component';
import { MedicationListComponent } from './Medication/components/medication-list/medication-list.component';
import { AuthGuard } from './Shared/Guards/auth.guard';
import { ProfileComponent } from './User/components/profile/profile.component';
import { RegisterComponent } from './User/components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodayListComponent } from './components/today-list/today-list.component';

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
