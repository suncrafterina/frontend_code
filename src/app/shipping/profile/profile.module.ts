import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module'
import { MaterialModules } from 'src/app/material-modules';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { PaymentComponent } from './payment/payment.component';
import { OtherComponent } from './other/other.component';


@NgModule({
  declarations: [ProfileComponent, PaymentComponent, OtherComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModules,
    RxReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule
  ],
  providers: [ AuthGuard]
})
export class ProfileModule { }
