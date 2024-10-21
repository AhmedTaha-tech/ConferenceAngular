import { NgModule } from '@angular/core';
import { ClientSubscriptionRoutingModule } from './client-subscription-routing.module';
import { SubscriptionErrorComponent } from './subscription-error/subscription-error.component';
import { ClientSubscriptionComponent } from './client-subscription/client-subscription.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ClientSubscriptionComponent,SubscriptionErrorComponent, SubscriptionErrorComponent],
  imports: [
    ClientSubscriptionRoutingModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    TranslateModule
  ]
})
export class ClientSubscriptionModule { }
