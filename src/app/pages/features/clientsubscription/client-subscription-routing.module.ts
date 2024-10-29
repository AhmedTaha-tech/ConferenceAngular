import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSubscriptionComponent } from './client-subscription/client-subscription.component';
import { SubscriptionErrorComponent } from './subscription-error/subscription-error.component';
import { SubscriptionSuccessComponent } from './subscription-success/subscription-success.component';

const routes: Routes = [
  { path: '',component: ClientSubscriptionComponent, },
  { path: 'success', component: SubscriptionSuccessComponent },
  { path: 'error', component: SubscriptionErrorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientSubscriptionRoutingModule { }
