import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsencesComponent } from './pages/absences/absences.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'absences',
    component: AbsencesComponent,
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
