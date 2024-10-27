import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLoginComponent } from './dashboard-login/dashboard-login.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app.module';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [DashboardLoginComponent,DashboardHomeComponent,QrScannerComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
    DashboardRoutingModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxScannerQrcodeModule,

    FormsModule,
    BrowserModule, 
    NgxScannerQrcodeModule, 
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class DashboardModuleModule { }
