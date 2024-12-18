import { NgModule } from '@angular/core';
import { ClientSubscriptionRoutingModule } from './client-subscription-routing.module';
import { SubscriptionErrorComponent } from './subscription-error/subscription-error.component';
import { ClientSubscriptionComponent } from './client-subscription/client-subscription.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { SubscriptionSuccessComponent } from './subscription-success/subscription-success.component';
import { HttpLoaderFactory } from '../../../app.module';

@NgModule({
  declarations: [ClientSubscriptionComponent,SubscriptionSuccessComponent, SubscriptionErrorComponent],
  imports: [
    ClientSubscriptionRoutingModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    TranslateModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class ClientSubscriptionModule { }
