import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardLoginComponent } from './dashboard-login/dashboard-login.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { SubscribersComponent } from './subscribers/subscribers.component';

const routes: Routes = [
  { path: '',component: DashboardHomeComponent},
  { path: 'dashoard/:componentName', component: DashboardHomeComponent },
  { path: 'dashoard/home',component: DashboardHomeComponent, pathMatch: 'full'},
  { path: 'dashoard/subscribers',component: SubscribersComponent},
  { path: 'dashoard/login', component: DashboardLoginComponent },
  { path: 'dashoard/scanner', component: QrScannerComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
