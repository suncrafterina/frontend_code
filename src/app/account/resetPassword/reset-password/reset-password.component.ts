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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPsdForm: FormGroup;
  matcher = new ValidationClassStateMatcher();
  subscription = new Subscription();
  verificationCode: string;
  otp: string;
  email: string;
  newpassword:string;
  confirmNewPassword:string;
  notMatch: boolean =false;
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
    this.resetPsdForm = this.fb.group({
      otp: ['', [Validators.required,  Validators.minLength(6), Validators.maxLength(6), CustomValidation.validateWhiteSpace]],
      new_password: ['', [Validators.required,  Validators.minLength(8),  Validators.maxLength(32) , CustomValidation.validatePassword, CustomValidation.validateWhiteSpace]],
      confirmPassword: ['', [Validators.required,  Validators.minLength(8),  Validators.maxLength(32) ,CustomValidation.validateWhiteSpace]]
    },{
      validator: this.MustMatch('new_password', 'confirmPassword')
    }
    )
}
MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}



validateMatchPass() {
  this.notMatch = false;
  this.resetPsdForm.controls['confirmPassword'].setErrors({ misMatch: null });
  //this.resetPsdForm.controls['confirmPassword'].updateValueAndValidity();
  if (this.resetPsdForm.value.new_password !== this.resetPsdForm.value.confirmPassword) {
    this.notMatch = true;
    this.resetPsdForm.controls['confirmPassword'].setErrors({ misMatch: true });
  }
  else{
    this.resetPsdForm.controls['confirmPassword'].updateValueAndValidity();
  }
}


hasError(field: any) {
  return CustomValidation.hasError(this.resetPsdForm, field);
}
get f() { return this.resetPsdForm.controls; }

resetPassword() {
    if (this.resetPsdForm.valid) {
      const resetData = {otp: this.f.otp.value, new_password: this.f.new_password.value};
        this._comm.notifyShowHideLoader({ show: true });
          this.getData.resetPassword(resetData).subscribe(res => {
            const msg = (res && res['message']) ? res['message'] : 'Password reset successfully';
            this._alrt.success('Success', msg);
            this.router.navigate(['/account/login']);
            this._comm.notifyShowHideLoader({ show: false });
            if (res) {
              const msg = (res && res['message']) ? res['message'] : 'Password reset successfully';
              this._alrt.success('Success', msg);
             
            }
          }, error => {
            this._comm.notifyShowHideLoader({ show: false });
            const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : "Error occured during otp code.";
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
          const msg = (res && res['message']) ? res['message'] : 'Otp send successfully';
          this._alrt.success('Success', msg);
        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : "Error occured during otp code.";
        this._alrt.error('Error', msg);
   
      })
   
}

}
