import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ForgotPasswordComponent } from './forgotPassword/forgot-password/forgot-password.component';
import { VerificationCodeComponent } from './verify-code/verification-code/verification-code.component';
import { ResetPasswordComponent } from './resetPassword/reset-password/reset-password.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS,HttpClientXsrfModule,HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { VerificationAccountComponent } from './register-verify-code/verification-account/verification-account.component';
import { MessageService } from '../_services/message.service';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        FlexLayoutModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        TranslateModule,
        MatSelectModule
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        VerificationCodeComponent,
        ResetPasswordComponent,
        VerificationAccountComponent
        
    ],
    providers: [ MessageService ]
    
})
export class AccountModule { 

    constructor(){
        
    }
}