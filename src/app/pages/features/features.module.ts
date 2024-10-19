import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeaturesRoutingModule } from './features-routing.module';
import { ClientSubscriptionModule } from './clientsubscription/client-subscription.module';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    FeaturesRoutingModule,
    ClientSubscriptionModule,
  ]
})
export class FeaturesModule { }
