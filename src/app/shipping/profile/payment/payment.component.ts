import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';
import { AlertService } from 'src/app/_services/alert.service';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomValidation } from 'src/app/_validators/custom-validation';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';
import { CommunicationService } from 'src/app/_services/communication.service';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AccountService } from '../../../_services';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  matcher = new ValidationClassStateMatcher();
  paymentForm: FormGroup;
  userDetailsLogin: any;
  isLocationRunning: boolean = false;
  paymentData: any;
  userId = null;
  affiliate = [{ 'label': 'Organization', 'value': 'ORGANIZATION' }, { 'label': 'Individual', 'value': 'INDIVIDUAL' }];
  userData = { bank_name: '', account_number: '', swift_code: '', affiliate_type: '',country_id:''};
  imageError = null;
  notMatch = false;
  countryList: any = [];
  country:any;
  constructor(private fb: FormBuilder, private getData: ProfileService, private account: AccountService, private _comm: CommunicationService, private _alrt: AlertService, private router: Router, private route: ActivatedRoute, private _auth: AuthenticationService,public translate: TranslateService) {
    this.formInIt();

    this.route.params.subscribe(params => {
      if (params) {

      }
    });

  }

  ngOnInit(): void {
    this.userDetailsLogin = this._auth.getLoginUserDetails();
    this.getCountryList();
    setTimeout(() => {
      this.getPaymentData();
    }, 500);
  }

  formInIt() {
    this.paymentForm = this.fb.group({
      bank_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), CustomValidation.validateWhiteSpace]],
      account_number: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), CustomValidation.validateWhiteSpace,CustomValidation.validateNumber]],
      swift_code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), CustomValidation.validateWhiteSpace]],
      affiliate_type: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
    });
  }
  hasError(field: any) {
    return CustomValidation.hasError(this.paymentForm, field);
  }


  arrHasError(formObj: any, field: any) {
    return CustomValidation.hasError(formObj, field);
  }

  submit() {
    if (this.paymentForm.valid) {
      this.userDetailsLogin = this._auth.getLoginUserDetails();
      var id = this.userDetailsLogin.id;
      const postData = JSON.parse(JSON.stringify(this.paymentForm.value));
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.updateUserPayment(postData).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        this.paymentData = JSON.parse(JSON.stringify(res));
        const msg = (res && res['message']) ? res['message'] :this.translate.instant('errorMessage.updateProfile');
        this._alrt.success('Success', msg);
        this.router.navigate(['shipping/profile/payment']);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error'] && error['error_description']) ? error['error_description'] :this.translate.instant('errorMessage.ErrorProfile');
        this._alrt.error('Error', msg);
      });
    }
  }
  getCountryList() {
    this.getData.getCountryList().subscribe(data => {
      if (data) {
        this.countryList = JSON.parse(JSON.stringify(data));
      }
    }, error => {

    });

  }
  getPaymentData() {
    var id = this.userDetailsLogin.id;
    // this.subscribe.add(
    if (id) {
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.getPaymentData().subscribe(data => {
        if (data) {
          this.paymentData = JSON.parse(JSON.stringify(data));
          this._comm.notifyShowHideLoader({ show: false });
          this.userData = this.paymentData;  // "hello"
          this.userId = data['id'];
        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });

      })
    }
    //);
  }
  resetForm()
  {
    this.paymentForm.patchValue({ bank_name: '' });
    this.paymentForm.patchValue({ account_number: '' });
    this.paymentForm.patchValue({ swift_code: '' });
    this.paymentForm.patchValue({ affiliate_type: '' });
    this.paymentForm.patchValue({ country_id: '' });
  }


}
