import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/features/home/home.component';
import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'features', 
    loadChildren: () => import('./pages/features/features.module').then(m => m.FeaturesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
