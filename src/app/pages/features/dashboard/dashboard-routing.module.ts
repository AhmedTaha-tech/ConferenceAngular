import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardLoginComponent } from './dashboard-login/dashboard-login.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { ScannerComponent } from './scanner/scanner.component';

const routes: Routes = [
  { path: '',component: DashboardHomeComponent},
  { path: 'dashoardhome',component: DashboardHomeComponent},
  { path: 'dashoardlogin', component: DashboardLoginComponent },
  { path: 'qrreader', component: QrScannerComponent },
  { path: 'scanner', component: ScannerComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
