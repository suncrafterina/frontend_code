import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CustomValidation } from 'src/app/_validators/custom-validation';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { AccountService, AlertService } from '../_services';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ConstantService } from 'src/app/_services/constant.service';
import { MessageService } from '../_services/message.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpXsrfTokenExtractor
} from '@angular/common/http';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { CommunicationService } from '../_services/communication.service';
import { User } from '../_models';
@Component({

  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
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
  languageKey: any = '';
  private userSubject: BehaviorSubject<User>;
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
    private _messageService: MessageService,
    public translate: TranslateService
  ) {
    this.userRoles = this._constant.userRoles;
    this.formInIt();
  }

  ngOnInit() {
    //localStorage.clear();
    // setTimeout(() => this.setCredential(), 0);
  }
  formInIt() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, CustomValidation.validateWhiteSpace, CustomValidation.validateEmail]],
      password: ['', [Validators.required, Validators.minLength(8), CustomValidation.validateWhiteSpace]],
      rememberMe: [],
    })
  }
  hasError(field: any) {
    return CustomValidation.hasError(this.loginForm, field);
  }
  get f() { return this.loginForm.controls; }

  login() {
    if (this.loginForm.invalid) {
      return;
    } else if (this.loginForm.value.rememberme) {
      localStorage.setItem('rememberme', JSON.stringify(this.loginForm.value));
    } else {
      localStorage.removeItem('rememberme');
    }

    //localStorage.clear();
    this._comm.notifyShowHideLoader({ show: true });
    this.subscription.add(
      this._auth.login(this.f.username.value, this.f.password.value).subscribe((data) => {
        //this.AccountUserData();
        if (this.rememberMe) {
          const rememberData = { email: this.loginForm.get('username').value, password: this.loginForm.get('password').value };
          let token = this.tokenExtractor.getToken();
          //this.setCookie('access_token', data.access_token,10);
          //this.setCookie('session_token', data.refresh_token,10);

        } else {
          if (this.getCookie('hytx')) {
            this.deleteCookie('hytx');
            //this.deleteCookie('access_token');
            // this.deleteCookie('session_token');
          }
        }
        if (data) {
          localStorage.setItem('user', JSON.stringify(data));
           this.router.navigate(['/admin']);
           // this._auth.loginNotifyNext({ status: true });
           // this.getData.AccountUserData(this._auth.userData.access_token).subscribe((data) => {
            // if (data) {
              localStorage.setItem('userDetails', JSON.stringify(data));
              this.languageKey = data.lang;
              this.translate.use(this.languageKey);
              console.log(data);
              console.log('data.role');
              console.log(data.role);
              switch (data.role) {
                case this.userRoles['ADMIN']:
                  console.log('1');
                  this.subscription.add(
                    this.getData.getMenu().subscribe(menu => {
                      console.log('2');
                      localStorage.setItem('menuItems', JSON.stringify(menu));
                      this.router.navigate(['/admin']);
                    })
                  );
                  this._comm.notifyShowHideLoader({ show: false });
                  break;
                case this.userRoles['FACTORYVENDOR']:
                  this.subscription.add(
                    this.getData.getFactoryMenu().subscribe(menu => {
                      localStorage.setItem('menuItems', JSON.stringify(menu));
                      this.profileStatus('factory', 'factoryvendor');
                      this.router.navigate(['/factory']);
                    })
                  );
                  this._comm.notifyShowHideLoader({ show: false });
                  break;
                case this.userRoles['WAREHOUSEVENDOR']:
                  this.subscription.add(
                    this.getData.getWarehouseMenu().subscribe(menu => {
                      localStorage.setItem('menuItems', JSON.stringify(menu));
                      this.profileStatus('warehouse', 'warehousevendor');
                      this.router.navigate(['/warehouse/']);
                    })
                  );
                  this._comm.notifyShowHideLoader({ show: false });
                  break;
                case this.userRoles['SHIPPINGVENDOR']:
                  console.log("case this.userRoles['SHIPPINGVENDOR']");
                  this.subscription.add(
                    this.getData.getShippingMenu().subscribe(menu => {
                      localStorage.setItem('menuItems', JSON.stringify(menu));
                      this.profileStatus('shipping', 'shippingvendor');
                      this.router.navigate(['/shipping']);
                    })
                  );
                  this._comm.notifyShowHideLoader({ show: false });
                  break;
                default:
                  //   this.subscription.add(
                  //     this.getData.getCustomerMenu().subscribe(customerMenu => {
                  //       localStorage.setItem('menuItems', JSON.stringify(customerMenu));
                  //       if (data['payload']['userDetails']['storeVerification']) {
                  //         this.router.navigate(['/customer']);
                  //       } else {
                  //         this.router.navigate(['/customer/account/store-setting']);
                  //       }
                  //     })
                  //   );
                  
                  break;
              }
            // }

          // });
          setTimeout(() => {
            this._comm.notifyShowHideLoader({ show: false });
          });

        }
      }, error => {
        if (error['error'] == '10018') {
          this._comm.notifyShowHideLoader({ show: false });
          localStorage.setItem('verification-email', this.loginForm.value.username);
          this.router.navigate(['/account/verification-account']);
          const msg = "Please activate your account";
          this._alrt.error('Error', msg);
        }
        else if (error['error'] == 'invalid_token') {
          localStorage.setItem('token',"false");
          this._comm.notifyShowHideLoader({ show: false });
          localStorage.clear();
          this._auth.logout();
          this.userSubject.next(null);
          this.router.navigate(['/account/login']);
        }
        else {
          this._comm.notifyShowHideLoader({ show: false });
          const msg = (error && error['error'] && error['error_description']) ? error['error_description'] : 'Invalid username or password.';
          this._alrt.error('Error', msg);
        }

      })
    );

  }

  setCredential() {
    // this.titleService.setTitle('Login');
    const cookieData = this.getCookie('hytx');
    if (cookieData) {
      const rememberData = JSON.parse(atob(cookieData));
      if (rememberData && rememberData['email'] && rememberData['password']) {
        this.loginForm.patchValue({
          username: rememberData['email'],
          password: rememberData['password']
        });
        this.rememberMe = true;
      }
    }
  }

  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  deleteCookie(cname) {
    const expires = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';
    document.cookie = cname + '=;' + expires + ';path=/';
  }

  getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }


  AccountUserData() {
    this._comm.notifyShowHideLoader({ show: true });
    this.getData.AccountUserData(this._auth.userData.access_token).subscribe((data) => {
      this._comm.notifyShowHideLoader({ show: false });
      localStorage.setItem('userDetails', JSON.stringify(data));
      if (data.length) {
        this.dataList = data;
        this._messageService.updateSelectedProfile(data);
      }

    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
    })
  }
  profileStatus(type, service) {
    let services = service;
    this.getData.getAccountStatus(services).subscribe(res => {
      if (res) {
        if (!res['basic']) {
          this.router.navigate(['/' + type + '/profile/info']);
        }
        else if (!res['payment']) {
          this.router.navigate(['/' + type + '/profile/payment']);
        }
        else {
          this.router.navigate(['/' + type + '']);
        }
        //this.categoryTitle = res['title'];
      }
    });
  }
}