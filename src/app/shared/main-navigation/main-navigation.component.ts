import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainNavigation } from 'src/app/interfaces/shared';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
})
export class MainNavigationComponent implements OnInit {
  @Output() close = new EventEmitter();
  mainMenu: MainNavigation;
  showMenu = false;
  allowedMenu = ['Log Out', 'Store Setting', 'Dashboard'];
  userDetails: any;
  currentUrl: any;
  userRoles: any = [];
  constructor(private _auth: AuthenticationService, private router: Router, location: Location) {
    this.userDetails = this._auth.getLoginUserDetails();
    this.currentUrl = '';
    var locationUrl = window.location.href;
    if (locationUrl) {
      var str = locationUrl.split('/#');
      if (str[1]) {
        this.currentUrl = str[1];
      }
    }
    this.router.events.subscribe(val => {
      if (location.path() != "") {
        this.currentUrl = location.path();
      }
    });
    
  }

  ngOnInit() {
    // this._auth.loginObservable$.subscribe(res => {
    //   if (res && res.status) {
    //     this.userDetails = this._auth.getLoginUserDetails();
    //   }
    // });
    this.mainMenu = JSON.parse(localStorage.getItem('menuItems'));
   
  }

  // close navigation
  closeNavigation() {
    this.close.emit();
  }

  // end of close navigation

  isActiveLink(item) {
    if (item && item['childPath']) {
      for (const i in item['childPath']) {
        if (item['childPath'][i] && this.currentUrl.indexOf(item['childPath'][i]) !== -1) {
          return 'active';
          break;
        }
      }
    }
    return '';
  }
  logout()
  {
    // this.accountService.logout();
    this._auth.logout()
      .subscribe(
        (data: any) => {
          if (data) {
            localStorage.clear();
            window.location.reload();
            this.router.navigate(['/account/login']);
          } else {
            localStorage.clear();
            this.router.navigate(['/account/login']);
            window.location.reload();
          }
        
        },
        error => {
          localStorage.clear();
          this.router.navigate(['/login']);
          window.location.reload();

        });
        this.router.navigate(['/account/login']);
  }
}
