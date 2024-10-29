import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardLoginComponent } from './dashboard-login/dashboard-login.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { authGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [
  { path: '',component: DashboardHomeComponent},
  { path: 'dashboard/:componentName', component: DashboardHomeComponent,canActivate: [authGuard] },
  { path: 'dashboard/home',component: DashboardHomeComponent, pathMatch: 'full',canActivate: [authGuard]},
  { path: 'dashboard/subscribers',component: SubscribersComponent,canActivate: [authGuard]},
  { path: 'dashboardlogin', component: DashboardLoginComponent },
  { path: 'dashboard/scanner', component: QrScannerComponent,canActivate: [authGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
