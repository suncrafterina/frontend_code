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
@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent implements OnInit {
  verifyCodeForm: FormGroup;
  matcher = new ValidationClassStateMatcher();
  subscription = new Subscription();
  verificationCode: string;
  otp: string;
  email:any
  constructor(
    public dialog: MatDialog,
    private getData: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private _alrt: AlertService,
    private _comm: CommunicationService,
    private _auth: AuthenticationService,
    private _constant: ConstantService,
    private active: ActivatedRoute
  ) { 
    this.formInIt();
  }

  ngOnInit(): void {
  this.active.params.subscribe(params=>{this.email=params['email']})
  }
  formInIt() {
    this.verifyCodeForm = this.fb.group({
      verification_code: ['', [Validators.required,  Validators.minLength(6), Validators.maxLength(6), CustomValidation.validateWhiteSpace]],
    })
}
hasError(field: any) {
  return CustomValidation.hasError(this.verifyCodeForm, field);
}
verifyCode() {
    if (this.verifyCodeForm.valid) {
      const postData =JSON.parse(JSON.stringify(this.verifyCodeForm.value));
        this._comm.notifyShowHideLoader({ show: true });
          this.getData.verifyCode(postData).subscribe(data => {
            this._comm.notifyShowHideLoader({ show: false });
            if (data) {
             // this._auth.loginNotifyNext({ status: true });
             this.router.navigate(['/account/reset-password']);
            }
          }, error => {
            this._comm.notifyShowHideLoader({ show: false });
            const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : "Error occured during verification code.";
            this._alrt.error('Error', msg);
       
          })
       
      }
  }

  resendOtp() {
        event.preventDefault();
        const postData =JSON.parse(JSON.stringify({email:this.email}));
        this._comm.notifyShowHideLoader({ show: true });
          this.getData.resendCode(postData).subscribe(res => {
            this._comm.notifyShowHideLoader({ show: false });
            if (res) {
              this._comm.notifyShowHideLoader({ show: false });
              const msg = (res && res['message']) ? res['message'] : 'Otp added successfully';
              this._alrt.success('Success', msg);
            }
          }, error => {
            this._comm.notifyShowHideLoader({ show: false });
            const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : "Error occured during verification code.";
            this._alrt.error('Error', msg);
          })
       
  }

}
