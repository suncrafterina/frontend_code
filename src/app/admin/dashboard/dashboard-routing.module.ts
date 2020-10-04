import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes),TranslateModule],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
