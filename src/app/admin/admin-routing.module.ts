import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { childRoutes } from './child-routes';
import { AuthGuard } from '../_helpers/auth.guard';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
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
        ]
      },
      
     
      ...childRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
  providers: [AuthGuard]

    
})
export class AdminRoutingModule {}
