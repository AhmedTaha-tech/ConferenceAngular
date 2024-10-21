import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'clientsubscription', 
    loadChildren: () => import('./clientsubscription/client-subscription.module').then(m => m.ClientSubscriptionModule)
  },
  {
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard-module.module').then(m => m.DashboardModuleModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule { }
