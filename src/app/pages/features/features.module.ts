import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeaturesRoutingModule } from './features-routing.module';
import { ClientSubscriptionModule } from './clientsubscription/client-subscription.module';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    FeaturesRoutingModule,
    ClientSubscriptionModule,
    TranslateModule,
    MatCardModule, 
    MatButtonModule
  ]
})
export class FeaturesModule { }
