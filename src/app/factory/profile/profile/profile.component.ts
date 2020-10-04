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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MessageService } from '../../../_services/message.service';

import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpXsrfTokenExtractor
} from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  matcher = new ValidationClassStateMatcher();
  profileForm: FormGroup;
  userDetailsLogin: any;
  isLocationRunning: boolean = false;
  maxHeightWidth = 800;
  minHeightWidth = 100;
  profileData: any;
  userId = null;
  language = [{ 'label': 'english', 'value': 'en' }, { 'label': 'chinese', 'value': 'ch' }];
  userData = { first_name: '', last_name: '', email: '', agent_code: '', phone_number: '', factory_name: '', type_of_business: '', city: '', state: '', country: '', description: '', zip_code: '', address_line_1: '', address_line_2: '' };
  imgPreview: SafeResourceUrl;
  companyimgPreview: SafeResourceUrl;
  companyBanner: SafeResourceUrl;
  imageError = null;
  companyimageError = null;
  companyBannerimageError = null;
  existImage = null;
  notMatch = false;
  is_change_password = false;
  uploadFileName: any;
  selectFile = null;
  companySelectFile = null;
  companyBannerSelectFile = null;
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  url: SafeResourceUrl;
  city: any;
  state: any;
  country: any;
  profileImageText = "AddImage";
  companyImageText = "AddImage";
  bannerImageText = "AddImage";
  profileBasic = false;
  profilePayment = false;
  constructor(private fb: FormBuilder,
    private getData: ProfileService, private account: AccountService,
    private _comm: CommunicationService, private _alrt: AlertService,
    private router: Router, private route: ActivatedRoute,
    private _auth: AuthenticationService,
    public sanitizer: DomSanitizer, public translate: TranslateService,
    private tokenExtractor: HttpXsrfTokenExtractor, private _messageService: MessageService) {
    this.formInIt();
    this.route.params.subscribe(params => {
      if (params) {

      }
    });

  }
  ngOnInit(): void {
    this._messageService.changeMessage("Account");
    this.userDetailsLogin = this._auth.getLoginUserDetails();
    this.getCountryList();
    setTimeout(() => {
      this.getProfileData();
      this.profileStatus('factoryvendor');
    }, 500);
  }

  formInIt() {
    this.profileForm = this.fb.group({
      agent_code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), CustomValidation.validateWhiteSpace]],
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), CustomValidation.validateWhiteSpace]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), CustomValidation.validateWhiteSpace]],
      email: ['', [Validators.required, Validators.maxLength(75), CustomValidation.validateWhiteSpace]],
      phone_number: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(15), CustomValidation.validatePhoneNumber]],
      factory_name: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(75), CustomValidation.validateWhiteSpace]],
      type_of_business: ['', [Validators.required, Validators.maxLength(75), Validators.minLength(3)]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      address_line_1: ['', [Validators.minLength(50),Validators.maxLength(200)]],
      address_line_2: ['', [Validators.minLength(50),Validators.maxLength(200)]],
      zip_code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(6), CustomValidation.validateWhiteSpace, CustomValidation.validateZipCode]],
      image_url: [''],
    });
    // this.profileForm = this.fb.group({
    //   first_name: [''],

    // })
    //this.profileForm.patchValue({ last_name: "bvb" });
  }

  hasError(field: any) {
    return CustomValidation.hasError(this.profileForm, field);
  }


  arrHasError(formObj: any, field: any) {
    return CustomValidation.hasError(formObj, field);
  }
  getProfileData() {
    this.userDetailsLogin = this._auth.getLoginUserDetails();
    var id = this.userDetailsLogin.id;
    // this.subscribe.add(
    if (id) {
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.getUserData(id).subscribe(data => {
        if (data) {
          this.profileData = JSON.parse(JSON.stringify(data));
          this._comm.notifyShowHideLoader({ show: false });
          this.userData = this.profileData;  // "hello"
          this.userId = data['id'];
          this.country = data['city']['state']['country']['id'];
          this.state = data['city']['state']['id'];
          this.city = data['city']['id'];
          this.getstateSelected(this.country, this.state);
          this.profileForm.patchValue({ country: this.country });
          this.profileForm.patchValue({ state: this.state });
          this.profileForm.patchValue({ city: this.city });
          this.profileForm.patchValue({ id: this.userId });
          this.AccountUserData();
          if (data['profile_image']) {
            this.profileForm.patchValue({ profile_image: data['image_url'] });
            this.imgPreview = data['profile_image'];
            this.existImage = data['profile_image'].split('/').pop();
            this.profileImageText = "ChangeImage";
          }
          if (data['company_banner']) {
            this.profileForm.patchValue({ company_banner: data['image_url'] });
            this.companyBanner = data['company_banner'];
            this.existImage = data['company_banner'].split('/').pop();
            this.companyImageText = "ChangeImage";
          }
          if (data['company_logo']) {
            this.profileForm.patchValue({ company_logo: data['image_url'] });
            this.companyimgPreview = data['company_logo'];
            this.existImage = data['company_logo'].split('/').pop();
            this.bannerImageText = "ChangeImage";
          }

        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });

      })
    }
    //);
  }


  managePasswordValidation() {
    this.profileForm.get('password').clearValidators();
    this.profileForm.get('confirm_password').clearValidators();
    this.profileForm.get('current_password').clearValidators();
    if (this.is_change_password) {
      this.profileForm.get('password').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(32), CustomValidation.validateWhiteSpace, CustomValidation.validatePassword]);
      this.profileForm.get('current_password').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(32), CustomValidation.validateWhiteSpace, CustomValidation.validatePassword]);
      this.profileForm.get('confirm_password').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(32), CustomValidation.validateWhiteSpace]);
    }
    this.profileForm.get('password').updateValueAndValidity();
    this.profileForm.get('confirm_password').updateValueAndValidity();
    this.profileForm.get('current_password').updateValueAndValidity();
  }

  validateMatchPass() {
    this.notMatch = false;
    if (this.profileForm.value.password && this.profileForm.value.confirm_password && (this.profileForm.value.password !== this.profileForm.value.confirm_password)) {
      this.notMatch = true;
      this.profileForm.controls['confirm_password'].setErrors({ misMatch: true });
    }
  }

  /* image upload */
  fileChange(event) {
    this.imageError = null;
    var allowedImages = 'jpg,jpeg,png';
    var fileSizeLimit = 2097152; // 2MB
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const ext = file.type.split('/').pop();
      let status = true;
      if (allowedImages.indexOf(ext) === -1) {
        status = false;
        this.imageError = this.translate.instant('errorMessage.invalidFile');
      }
      if (file.size > fileSizeLimit) {
        status = false;
        this.imageError = this.translate.instant('errorMessage.fileSize');
      }
      if (status) {
        this.uploadFileName = new Date().getTime() + '_' + file.name.replace(/[^A-Z0-9.]/gi, '');
        /*if (this.profileForm.value['profileImage']) {
          this.uploadFileName = this.profileForm.value['profileImage'].split('/').pop();
        }*/
        this._comm.notifyShowHideLoader({ show: true });
        /* image diemension validation */
        var img = new Image();
        img.src = window.URL.createObjectURL(file);
        const that = this;
        img.onload = function () {
          if (img.naturalWidth > that.maxHeightWidth || img.naturalHeight > that.maxHeightWidth || img.naturalHeight < that.minHeightWidth || img.naturalWidth < that.minHeightWidth) {
            that._comm.notifyShowHideLoader({ show: false });
            that.imageError = that.translate.instant('errorMessage.ImageDimension');
            that.profileForm.get('image_url').setValidators([Validators.required]);
            return;
          } else {
            that._comm.notifyShowHideLoader({ show: false });
            that.selectFile = file;
            that.imgPreview = that.sanitizer.bypassSecurityTrustResourceUrl(
              img.src
            );
            that.profileImageText = "ChangeImage";

          }
        }
      }
    } else {
      this.imageError = this.translate.instant('errorMessage.PleaseSelectImage');
    }
  }
  /* image upload */
  fileChanges(event) {
    this.companyimageError = null;
    var allowedImages = 'jpg,jpeg,png';
    var fileSizeLimit = 2097152; // 2MB
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const ext = file.type.split('/').pop();
      let status = true;
      if (allowedImages.indexOf(ext) === -1) {
        status = false;
        this.companyimageError = this.translate.instant('errorMessage.invalidFile');
      }
      if (file.size > fileSizeLimit) {
        status = false;
        this.companyimageError = this.translate.instant('errorMessage.fileSize');
      }
      if (status) {
        this.uploadFileName = new Date().getTime() + '_' + file.name.replace(/[^A-Z0-9.]/gi, '');
        /*if (this.profileForm.value['profileImage']) {
          this.uploadFileName = this.profileForm.value['profileImage'].split('/').pop();
        }*/
        this._comm.notifyShowHideLoader({ show: true });
        /* image diemension validation */
        var companyLogoimg = new Image();
        companyLogoimg.src = window.URL.createObjectURL(file);
        const that = this;
        companyLogoimg.onload = function () {
          if (companyLogoimg.naturalWidth > that.maxHeightWidth || companyLogoimg.naturalHeight > that.maxHeightWidth || companyLogoimg.naturalHeight < that.minHeightWidth || companyLogoimg.naturalWidth < that.minHeightWidth) {
            that._comm.notifyShowHideLoader({ show: false });
            that.companyimageError = that.translate.instant('errorMessage.ImageDimension');
            that.profileForm.get('image_url').setValidators([Validators.required]);
            return;
          } else {
            that._comm.notifyShowHideLoader({ show: false });
            that.companySelectFile = file;
            that.companyimgPreview = that.sanitizer.bypassSecurityTrustResourceUrl(
              companyLogoimg.src
            );
            that.companyImageText = "ChangeImage";

          }
        }
      }
    } else {
      this.imageError = this.translate.instant('errorMessage.PleaseSelectImage');
    }
  }


  /* image upload */
  companyBannerChange(event) {
    this.companyBannerimageError = null;
    var allowedImages = 'jpg,jpeg,png';
    var fileSizeLimit = 2097152; // 2MB
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const ext = file.type.split('/').pop();
      let status = true;
      if (allowedImages.indexOf(ext) === -1) {
        status = false;
        this.companyBannerimageError = this.translate.instant('errorMessage.invalidFile');
      }
      if (file.size > fileSizeLimit) {
        status = false;
        this.companyBannerimageError = this.translate.instant('errorMessage.fileSize');
      }
      if (status) {
        this.uploadFileName = new Date().getTime() + '_' + file.name.replace(/[^A-Z0-9.]/gi, '');
        /*if (this.profileForm.value['profileImage']) {
          this.uploadFileName = this.profileForm.value['profileImage'].split('/').pop();
        }*/
        this._comm.notifyShowHideLoader({ show: true });
        /* image diemension validation */
        var banner = new Image();
        banner.src = window.URL.createObjectURL(file);
        const that = this;
        banner.onload = function () {
          if (banner.naturalWidth > that.maxHeightWidth || banner.naturalHeight > that.maxHeightWidth || banner.naturalHeight < that.minHeightWidth || banner.naturalWidth < that.minHeightWidth) {
            that._comm.notifyShowHideLoader({ show: false });
            that.companyBannerimageError = that.translate.instant('errorMessage.ImageDimension');
            that.profileForm.get('image_url').setValidators([Validators.required]);
            return;
          } else {
            that._comm.notifyShowHideLoader({ show: false });
            that.companyBannerSelectFile = file;
            that.companyBanner = that.sanitizer.bypassSecurityTrustResourceUrl(
              banner.src
            );
            that.bannerImageText = "ChangeImage";

          }
        }
      }
    } else {
      this.imageError =  this.translate.instant('errorMessage.PleaseSelectImage');
    }
  }


  profile() {
    if (this.profileForm.valid) {
      this.userDetailsLogin = this._auth.getLoginUserDetails();
      var id = this.userDetailsLogin.id;
      const postData = JSON.parse(JSON.stringify(this.profileForm.value));
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.updateUserProfile(postData, this.selectFile, id, this.companySelectFile, this.companyBannerSelectFile).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        this.profileData = JSON.parse(JSON.stringify(res));
        const msg = (res && res['message']) ? res['message'] : this.translate.instant('errorMessage.userProfileSuccessfullyUpdate');
        this._alrt.success('Success', msg);
        this.is_change_password = false;
        this.profileForm.patchValue({ password: '', confirmPassword: '' });
        //this.managePasswordValidation();
        /* set user details local storage */
        this.AccountUserData();
        this.router.navigate(['factory/profile/info']);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.ErrorOccuredDuringUserProfile');
        this._alrt.error('Error', msg);
      });
    }
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
  getCountryList() {
    this.getData.getCountryList().subscribe(data => {
      if (data) {
        this.countryList = JSON.parse(JSON.stringify(data));
      }
    }, error => {

    });

  }
  onCountrySelected(event: any) {
    const countryId = event.value;
    this.cityList = [];
    if (countryId) {
      this.getData.getStateList(countryId).subscribe(data => {
        if (data) {
          this.stateList = JSON.parse(JSON.stringify(data));
        }
      }, error => {

      });
    }

  }
  getstateSelected(id: any, stateId: any) {
    const countryId = id;
    this.cityList = [];
    if (countryId) {
      this.getData.getStateList(countryId).subscribe(data => {
        if (data) {
          this.stateList = JSON.parse(JSON.stringify(data));
          this.getcitySelected(stateId);
        }
      }, error => {

      });
    }

  }
  getcitySelected(id: any) {
    const countryId = id;
    this.cityList = [];
    if (countryId) {
      this.getData.getCityList(id).subscribe(data => {
        if (data) {
          this.cityList = JSON.parse(JSON.stringify(data));
        }
      }, error => {

      });
    }

  }
  onstateSelected(event: any) {
    const stateId = event.value;
    if (stateId) {
      this.getData.getCityList(stateId).subscribe(data => {
        if (data) {
          this.cityList = JSON.parse(JSON.stringify(data));
        }
      }, error => {

      });
    }

  }
  redirect() {
   
  }
  profileStatus(service)
  {
    let services = service;
    this.account.getAccountStatus(services).subscribe(res => {
      if (res) {
        this.profileBasic   = res['basic'];
        this.profilePayment = res['payment'];
      }
    });
  }

}
