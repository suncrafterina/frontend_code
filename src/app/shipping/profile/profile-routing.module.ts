import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../_helpers';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {PaymentComponent} from './payment/payment.component';
import {OtherComponent} from './other/other.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';


const profileRoutes: Routes = [
  {
    path: 'info',
    component: ProfileComponent,
    data: { title: 'Profile' },
    canActivate: [AuthGuard],
  },
  {
    path: 'payment',
    component: PaymentComponent,
    data: { title: 'Account' },
    canActivate: [AuthGuard],
  },
  {
    path: 'other',
    component: OtherComponent,
    data: { title: 'Account' },
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: ProfileComponent,
    data: { title: 'Profile' },
    canActivate: [AuthGuard],
  },


];
const profile: Routes = [
  {
    path: '',
    data: { title: 'Profile' },
    children: profileRoutes
  }
];
@NgModule({
  imports: [RouterModule.forChild(profile),TranslateModule],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
