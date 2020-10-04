import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { childRoutes } from './child-routes';
import { AuthGuard } from '../_helpers/auth.guard';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { LayoutComponent } from './layout/layout.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        canActivate: [
          AuthGuard
        ],
        pathMatch: 'full'
      },
      
     
      ...childRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),TranslateModule],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ShippingRoutingModule {
  constructor(){
    
  }
 }
