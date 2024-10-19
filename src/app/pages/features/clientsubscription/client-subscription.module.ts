import { NgModule } from '@angular/core';
import { ClientSubscriptionRoutingModule } from './client-subscription-routing.module';
import { SubscriptionErrorComponent } from './subscription-error/subscription-error.component';
import { ClientSubscriptionComponent } from './client-subscription/client-subscription.component';


@NgModule({
  declarations: [ClientSubscriptionComponent,SubscriptionErrorComponent, SubscriptionErrorComponent],
  imports: [
    ClientSubscriptionRoutingModule
  ]
})
export class ClientSubscriptionModule { }
