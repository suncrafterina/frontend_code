import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CustomValidation } from 'src/app/_validators/custom-validation';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { AccountService, AlertService } from '../../../_services';
import { CommunicationService } from 'src/app/_services/communication.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ConstantService } from 'src/app/_services/constant.service';
import { TranslateService } from '@ngx-translate/core';
 
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  matcher = new ValidationClassStateMatcher();
  subscription = new Subscription();
  account: string;
  users: any;
  email: string;
  forgotPasswordEmail:string;
  constructor(
    public dialog: MatDialog,
    private getData: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private _alrt: AlertService,
    private _comm: CommunicationService,
    private _auth: AuthenticationService,
    private _constant: ConstantService,
    public translate: TranslateService
  ) { 
    this.formInIt();
  }

  ngOnInit(): void {
  }
  formInIt() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, CustomValidation.validateWhiteSpace, CustomValidation.validateEmail]],
    })
}
hasError(field: any) {
  return CustomValidation.hasError(this.forgotPasswordForm, field);
}

forgotPassword() {
  if (this.forgotPasswordForm.valid) {
      this._comm.notifyShowHideLoader({ show: true });
        this.getData.forgotPassword(this.forgotPasswordForm.value).subscribe(res => {
          this._comm.notifyShowHideLoader({ show: false });
          if (res) {
            this.forgotPasswordEmail =res.email;
            this._comm.notifyShowHideLoader({ show: false });
            const msg = (res && res['message']) ? res['message'] : this.translate.instant('errorMessage.forgotSucc');
            this._alrt.success('Success', msg);
           // this._auth.loginNotifyNext({ status: true });
            this.router.navigate(['/account/reset-password',  this.forgotPasswordEmail]);
          }
        }, error => {
          this._comm.notifyShowHideLoader({ show: false });
          const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] :this.translate.instant('errorMessage.forgotErr');
          this._alrt.error('Error', msg);
     
        })
    }
}
}
