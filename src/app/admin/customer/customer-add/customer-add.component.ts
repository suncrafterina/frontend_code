import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CustomValidation } from 'src/app/_validators/custom-validation';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { CommunicationService } from 'src/app/_services/communication.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ConstantService } from 'src/app/_services/constant.service';
import { AlertService } from 'src/app/_services/alert.service';

import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpXsrfTokenExtractor
} from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  confirm_password:any;
  password:any;
  customerAddForm: FormGroup;
  subscription = new Subscription();
  matcher = new ValidationClassStateMatcher();
  notMatch = false;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private _alrt: AlertService,
    private _comm: CommunicationService,
    private _auth: AuthenticationService,
    private _constant: ConstantService,
    private tokenExtractor: HttpXsrfTokenExtractor,
    public translate: TranslateService,
    private _customerService:CustomerService
  ) {
    this.formInIt();
  }

  ngOnInit() {
    localStorage.clear();
  }
  formInIt() {
    this.customerAddForm = this.fb.group({
      first_name: ['', [Validators.required, CustomValidation.validateWhiteSpace,Validators.minLength(3),Validators.maxLength(25)]],
      last_name: ['', [Validators.required, CustomValidation.validateWhiteSpace,Validators.minLength(3),Validators.maxLength(25)]],
      phone_number: ['', [Validators.required, CustomValidation.validateWhiteSpace,Validators.minLength(10), Validators.maxLength(15)]],
      email: ['', [Validators.required, CustomValidation.validateWhiteSpace, CustomValidation.validateEmail]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), CustomValidation.validateWhiteSpace]],
      confirm_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), CustomValidation.validateWhiteSpace, CustomValidation.validatePassword]],
    })
  }
  hasError(field: any) {
    return CustomValidation.hasError(this.customerAddForm, field);
  }


  arrHasError(formObj: any, field: any) {
    return CustomValidation.hasError(this.customerAddForm, field);
  }

  addCustomer() {
    if (this.customerAddForm.valid) {
      this._comm.notifyShowHideLoader({ show: true });
      this._customerService.addCustomer(this.customerAddForm.value).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        if (res) {
          this._comm.notifyShowHideLoader({ show: false });
          const msg = (res && res['message']) ? res['message'] : this.translate.instant('Common.customerRegister');
          this._alrt.success('Success', msg);
          this.router.navigate(['/admin/customer/customer-list']);
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
    if (this.customerAddForm.value.password && this.customerAddForm.value.confirm_password && (this.customerAddForm.value.password !== this.customerAddForm.value.confirm_password)) {
      this.notMatch = true;
      this.customerAddForm.controls['confirm_password'].setErrors({ misMatch: true });
    }
  }
  resetForm()
{

}
}
