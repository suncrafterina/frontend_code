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
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-verification-account',
  templateUrl: './verification-account.component.html',
  styleUrls: ['./verification-account.component.scss']
})
export class VerificationAccountComponent implements OnInit {

  verifyCodeForm: FormGroup;
  matcher = new ValidationClassStateMatcher();
  subscription = new Subscription();
  verificationCode: string;
  otp: string;
  email: any
  constructor(
    public dialog: MatDialog,
    private getData: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private _alrt: AlertService,
    private _comm: CommunicationService,
    private active: ActivatedRoute,
    public translate: TranslateService
  ) {
    this.formInIt();
    this.email = localStorage.getItem('verification-email');
  }


  ngOnInit(): void {
    
  }
  formInIt() {
    this.verifyCodeForm = this.fb.group({
      verification_code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), CustomValidation.validateWhiteSpace]],
    })
  }
  hasError(field: any) {
    return CustomValidation.hasError(this.verifyCodeForm, field);
  }
  verifyCode() {
    if (this.verifyCodeForm.valid) {
      const postData = JSON.parse(JSON.stringify(this.verifyCodeForm.value));
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.verifyCode(postData).subscribe(data => {
        this._comm.notifyShowHideLoader({ show: false });
        localStorage.removeItem('verification-email');
        const msg = (data && data['message']) ? data['message'] :this.translate.instant('Verification.success');
        this._alrt.success('Success', msg);
        this.router.navigate(['/account/login']);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('Verification.invalidCode');
        this._alrt.error('Error', msg);
      })

    }
  }
  resendOtp() {
    event.preventDefault();
    const postData = JSON.parse(JSON.stringify({ email: this.email }));
    this._comm.notifyShowHideLoader({ show: true });
    this.getData.resendAccount(postData).subscribe(res => {
      this._comm.notifyShowHideLoader({ show: false });
      if (res) {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (res && res['message']) ? res['message'] : this.translate.instant('Verification.otpSend');
        this._alrt.success('Success', msg);
      }
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
      const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('Verification.invalidCode');
      this._alrt.error('Error', msg);
    })

  }

}
