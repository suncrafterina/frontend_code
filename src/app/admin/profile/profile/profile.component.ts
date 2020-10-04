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
import {TranslateService} from '@ngx-translate/core';
import { MessageService } from '../../../_services/message.service';
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
  language = [{ 'label': 'english', 'value': 'en' }, { 'label': 'chinese', 'value': 'zh-Hans' }];
  userData = { first_name: '', last_name: '', email: '', is_change_password: '', password: '', confirm_password: '', language: '' };
  imgPreview: SafeResourceUrl;
  imageError = null;
  existImage = null;
  notMatch = false;
  is_change_password = false;
  uploadFileName: any;
  selectFile = null;
  url: SafeResourceUrl;
  languageSet:string;
  constructor(
      private fb: FormBuilder,
      private getData: ProfileService,
      private account: AccountService,
      private _comm: CommunicationService,
      private _alrt: AlertService,
      private router: Router,
      private route: ActivatedRoute,
      private _auth: AuthenticationService,
      public sanitizer: DomSanitizer,
      public translate: TranslateService,
      private _messageService: MessageService
    ) {
      
    this.formInIt();
    
    this.route.params.subscribe(params => {
      if (params) {

      }
    });

  }
  ngOnInit(): void {
    this._messageService.changeMessage('account');
    this.userDetailsLogin = this._auth.getLoginUserDetails();
    setTimeout(() => {
      this.getProfileData();
    }, 500);
  }

  formInIt() {
    this.profileForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), CustomValidation.validateWhiteSpace]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), CustomValidation.validateWhiteSpace]],
      email: ['', [Validators.required, Validators.maxLength(75), CustomValidation.validateWhiteSpace]],
      is_change_password: ['', []],
      password: [''],
      confirm_password: [''],
      current_password: [''],
      image_url: [''],
      language: ['', [Validators.required]],
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
    var id = this.userDetailsLogin.id;
    // this.subscribe.add(
    this._comm.notifyShowHideLoader({ show: true });
    this.getData.getUserData(id).subscribe(data => {
      if (data) {
        console.log(data);
        this.profileData = JSON.parse(JSON.stringify(data));
        this._comm.notifyShowHideLoader({ show: false });
        this.userData = this.profileData;  // "hello"
        this.userId = data['id'];
        this.profileForm.patchValue({ id: this.userId });
        if (data['image_url']) {
          this.profileForm.patchValue({ image_url: data['image_url'] });
          this.imgPreview = data['image_url'];
          this.existImage = data['image_url'].split('/').pop();
        }

      }
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });

    })
    //);
  }


  managePasswordValidation() {
    this.profileForm.get('password').clearValidators();
    this.profileForm.get('confirm_password').clearValidators();
    this.profileForm.get('current_password').clearValidators();
    if (this.is_change_password) {
      this.profileForm.get('password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(32), CustomValidation.validateWhiteSpace, CustomValidation.validatePassword]);
      this.profileForm.get('current_password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(32), CustomValidation.validateWhiteSpace, CustomValidation.validatePassword]);
      this.profileForm.get('confirm_password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(32), CustomValidation.validateWhiteSpace]);
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
          console.log('w>', img.naturalWidth, '<he>', img.naturalHeight);
          if (img.naturalWidth > that.maxHeightWidth || img.naturalHeight > that.maxHeightWidth || img.naturalHeight < that.minHeightWidth || img.naturalWidth < that.minHeightWidth) {
            that._comm.notifyShowHideLoader({ show: false });
            that.imageError = that.translate.instant('errorMessage.ImageDimension');
            that.profileForm.get('image_url').setValidators([Validators.required]);
            return;
          } else {
            that._comm.notifyShowHideLoader({ show: false });
            that.selectFile = file;
            that.imgPreview =  that.sanitizer.bypassSecurityTrustResourceUrl(
              img.src
            );
            
          }
        }
        /* image diemension validation */
        /*const myReader: FileReader = new FileReader();
        myReader.onload = function(loadEvent: any) {};
        myReader.readAsDataURL(file);
        this.uploadOnS3(event);*/
      }
    } else {
      this.imageError = 'Please select image';
    }
  }

  profile() {
    if (this.profileForm.valid) {
      this.userDetailsLogin = this._auth.getLoginUserDetails();
      var id = this.userDetailsLogin.id;
      const postData = JSON.parse(JSON.stringify(this.profileForm.value));
      if(postData)
      {
        this.languageSet = postData['language'];
      }
      if (postData['is_change_password'] == true) {
        postData['is_change_password'] = true;
      } else {
        postData['is_change_password'] = false;
      }
      delete postData['confirm_password'];
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.updateUserProfile(postData, this.selectFile).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        this.profileData = JSON.parse(JSON.stringify(res));
        if(this.languageSet)
        {
          this.translate.use(this.languageSet);
         
        }
        const msg = (res && res['message']) ? res['message'] : this.translate.instant('errorMessage.ImageDimension');
        this._alrt.success('Success', msg);
        this.is_change_password = false;
        this.profileForm.patchValue({ password: '', confirmPassword: '' });
        this.managePasswordValidation();
         /* set user details local storage */
        this.AccountUserData();
        this.router.navigate(['admin/profile/info']);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error'] && error['error_description']) ? error['error_description'] : 'Error occured during user profile.';
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
 

}
