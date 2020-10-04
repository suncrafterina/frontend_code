import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ForgotPasswordComponent } from './forgotPassword/forgot-password/forgot-password.component';
import { VerificationCodeComponent } from './verify-code/verification-code/verification-code.component';
import { VerificationAccountComponent } from './register-verify-code/verification-account/verification-account.component';
import { ResetPasswordComponent } from './resetPassword/reset-password/reset-password.component';
import { AuthGuard } from '../_helpers/auth.guard';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
        ]
    },
    { path: 'register', component: RegisterComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'verification-code', component: VerificationCodeComponent},
    { path: 'verification-account', component: VerificationAccountComponent},
    { path: 'reset-password/:email', component: ResetPasswordComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes),TranslateModule],
    exports: [RouterModule]
})
export class AccountRoutingModule {
   
    

 }