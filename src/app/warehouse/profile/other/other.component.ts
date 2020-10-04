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
import { MessageService } from '../../../_services/message.service';
@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {

  matcher = new ValidationClassStateMatcher();
  otherForm: FormGroup;
  userDetailsLogin: any;
  isLocationRunning: boolean = false;
  maxHeightWidth = 800;
  minHeightWidth = 100;
  otherData: any;
  accountStatus:any;
  userId = null;
  accountText:any;
  languages = [{ 'label': 'english', 'value': 'en' }, { 'label': 'chinese', 'value': 'zh-Hans' }];
  userData = { new_password: '', confirm_password: '', current_password: '',language:''};
  notMatch = false;
  is_change_password = false;
  languageSet:string;
  constructor(private fb: FormBuilder,private _messageService: MessageService, private getData: ProfileService, private account: AccountService, private _comm: CommunicationService, private _alrt: AlertService, private router: Router, private route: ActivatedRoute, private _auth: AuthenticationService,public translate: TranslateService) {
    this.formInIt();
    this.route.params.subscribe(params => {
      if (params) {

      }
    });

  }

  ngOnInit(): void {
    this.userDetailsLogin = this._auth.getLoginUserDetails();
    setTimeout(() => {
      this.getOtherData();
    }, 500);
  }
  formInIt() {
    this.otherForm = this.fb.group({
      language: ['', [Validators.required]],
      is_active:[''],
      is_change_password: [''],
      new_password: [''],
      confirm_password: [''],
      current_password: [''],
     
    });
  }

  hasError(field: any) {
    return CustomValidation.hasError(this.otherForm, field);
  }


  arrHasError(formObj: any, field: any) {
    return CustomValidation.hasError(formObj, field);
  }
  getOtherData() {
    var id = this.userDetailsLogin.id;
    // this.subscribe.add(
    if (id) {
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.getOtherData().subscribe(data => {
        if (data) {
          this.otherData = JSON.parse(JSON.stringify(data));
          this.accountStatus = this.otherData.is_active == true ? false : true;
          this.accountText = this.otherData.is_active == true ? this.translate.instant('Common.activateAccount') : this.translate.instant('Common.dactivateAccount');
          this._comm.notifyShowHideLoader({ show: false });
          this.userData = this.otherData;  // "hello"
          this.userId = data['id'];
        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });

      })
    }
    //);
  }
  validateMatchPass() {
    this.notMatch = false;
    if (this.otherForm.value.new_password && this.otherForm.value.confirm_password && (this.otherForm.value.new_password !== this.otherForm.value.confirm_password)) {
      this.notMatch = true;
      this.otherForm.controls['confirm_password'].setErrors({ misMatch: true });
    }
  }
  submit()
  {
    if (this.otherForm.valid) {
      this.userDetailsLogin = this._auth.getLoginUserDetails();
      var id = this.userDetailsLogin.id;
      const postData = JSON.parse(JSON.stringify(this.otherForm.value));
      if(postData)
      {
        this.languageSet = postData['language'];
      }
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.updateUserOther(postData).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        this.otherData = JSON.parse(JSON.stringify(res));
        this.otherForm.patchValue({ new_password: '', confirm_password: '',current_password:'' });
        this.is_change_password = false;
        this.managePasswordValidation();
        this.AccountUserData();
        if(this.languageSet)
        {
          this.translate.use(this.languageSet);
        }
        const msg = (res && res['message']) ? res['message'] :this.translate.instant('errorMessage.updateProfile');
        this._alrt.success('Success', msg);
        this.router.navigate(['warehouse/profile/other']);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error'] && error['error_description']) ? error['error_description'] :this.translate.instant('errorMessage.ErrorProfile');
        this._alrt.error('Error', msg);
      });
    }
  }
  resetForm()
  {
    this.otherForm.patchValue({ new_password: '', confirm_password: '',current_password:'' });
  }
  accountChange(status,lang)
  {
      const postData = JSON.parse(JSON.stringify({is_active: status,language:lang}));
      this.getData.updateAccountUserOther(postData).subscribe(res => {
      this._comm.notifyShowHideLoader({ show: false });
      this.otherData = JSON.parse(JSON.stringify(res));
      const msg = (res && res['message']) ? res['message'] :this.translate.instant('errorMessage.updateProfile');
      this.getOtherData();
      this._alrt.success('Success', msg);
      this.router.navigate(['warehouse/profile/other']);
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
      const msg = (error && error['error'] && error['error_description']) ? error['error_description'] :this.translate.instant('errorMessage.ErrorProfile');
      this._alrt.error('Error', msg);
    });

  }

  managePasswordValidation() {
    this.otherForm.get('new_password').clearValidators();
    this.otherForm.get('confirm_password').clearValidators();
    this.otherForm.get('current_password').clearValidators();
    if (this.is_change_password) {
      this.otherForm.get('new_password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(32), CustomValidation.validateWhiteSpace, CustomValidation.validatePassword]);
      this.otherForm.get('current_password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(32), CustomValidation.validateWhiteSpace, CustomValidation.validatePassword]);
      this.otherForm.get('confirm_password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(32), CustomValidation.validateWhiteSpace]);
    }
    this.otherForm.get('new_password').updateValueAndValidity();
    this.otherForm.get('confirm_password').updateValueAndValidity();
    this.otherForm.get('current_password').updateValueAndValidity();
  }
  AccountUserData() {
    localStorage.removeItem('userDetails');
    this.account.AccountUserData(this._auth.userData.access_token).subscribe((data) => {
      this._messageService.updateSelectedProfile(data);
      localStorage.setItem('userDetails', JSON.stringify(data));
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
    })
  }

}
