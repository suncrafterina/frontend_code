import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CustomValidation } from 'src/app/_validators/custom-validation';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { AccountService, AlertService } from '../_services';
import { CommunicationService } from 'src/app/_services/communication.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ConstantService } from 'src/app/_services/constant.service';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpXsrfTokenExtractor
} from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['login.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide = true;
  hide1 = true;
  username: string;
  users: any;
  subscription = new Subscription();
  account: string;
  password: string;
  loginForm: FormGroup;
  rememberMe = false;
  matcher = new ValidationClassStateMatcher();
  userRoles: any = [];
  dataList: any = [];
  access: any = {};
  notMatch = false;
  constructor(
    public dialog: MatDialog,
    private getData: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private _alrt: AlertService,
    private _comm: CommunicationService,
    private _auth: AuthenticationService,
    private _constant: ConstantService,
    private tokenExtractor: HttpXsrfTokenExtractor,
    public translate: TranslateService
  ) {
    this.userRoles = this._constant.userRolesDropdown;
    this.formInIt();
  }

  ngOnInit() {
    localStorage.clear();
  }
  formInIt() {
    this.registerForm = this.fb.group({
      role: ['', [Validators.required, CustomValidation.validateWhiteSpace]],
      email: ['', [Validators.required, CustomValidation.validateWhiteSpace, CustomValidation.validateEmail]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), CustomValidation.validateWhiteSpace, CustomValidation.validatePassword]],
      confirm_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), CustomValidation.validateWhiteSpace, CustomValidation.validatePassword]],
    })
  }
  hasError(field: any) {
    return CustomValidation.hasError(this.registerForm, field);
  }


  arrHasError(formObj: any, field: any) {
    return CustomValidation.hasError(formObj, field);
  }

  register() {
    if (this.registerForm.valid) {
      Object.keys(this.registerForm.controls).forEach((key) => this.registerForm.get(key).setValue(this.registerForm.get(key).value.trim()));
      localStorage.removeItem('verification-email');
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.register(this.registerForm.value).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        if (res) {
          this._comm.notifyShowHideLoader({ show: false });
          localStorage.setItem('verification-email', this.registerForm.value.email);
          const msg = (res && res['message']) ? res['message'] : this.translate.instant('Registration.accountRegister');
          this._alrt.success('Success', msg);
          this.router.navigate(['/account/verification-account']);
          // this._auth.loginNotifyNext({ status: true });
        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('Registration.invalidRegister');
        this._alrt.error('Error', msg);
      })
    }

  }
  validateMatchPass() {
    this.notMatch = false;
    if (this.registerForm.value.password && this.registerForm.value.confirm_password && (this.registerForm.value.password !== this.registerForm.value.confirm_password)) {
      this.notMatch = true;
      this.registerForm.controls['confirm_password'].setErrors({ misMatch: true });
    }
  }
  AccountUserData() {
    this._comm.notifyShowHideLoader({ show: true });
    this.getData.AccountUserData(this._auth.userData.access_token).subscribe((data) => {
      this._comm.notifyShowHideLoader({ show: false });
      localStorage.setItem('userDetails', JSON.stringify(data));
      this.dataList = data;
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
    })
  }

}