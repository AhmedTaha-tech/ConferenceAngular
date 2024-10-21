import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardLoginComponent } from './dashboard-login/dashboard-login.component';

const routes: Routes = [
  { path: '',component: DashboardHomeComponent},
  { path: 'dashoardlogin', component: DashboardLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
