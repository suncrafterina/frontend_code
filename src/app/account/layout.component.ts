import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../_services';
import { TranslateService } from '@ngx-translate/core';
import { CommunicationService } from '../_services/communication.service';
import { ConstantService } from 'src/app/_services/constant.service';
@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    showLoader: any;
    dataList:any =[];
    userRoles: any = [];
    constructor(
        private router: Router,
        private accountService: AccountService,
        private translate: TranslateService,
        private _comm: CommunicationService,
        private _constant: ConstantService
    ) {
      this.userRoles = this._constant.userRoles;
        // redirect to home if already logged in
        if (this.accountService.userValue)
        {
          this.dataList = this.accountService.userValue;
          console.log(this.dataList);
          setTimeout(() => {
            if (this.dataList.authorities) {
              switch (this.dataList.authorities[0]) {
                case this.userRoles['ADMIN']:
                  this.router.navigate(['/admin']);
                  break;
                case this.userRoles['FACTORYVENDOR']:
                  this.router.navigate(['/factory']);
                  break;
                case this.userRoles['WAREHOUSEVENDOR']:
                  this.router.navigate(['/warehouse/warehouse-pages']);
                  break;
                  case this.userRoles['SHIPPINGVENDOR']:
                    this.router.navigate(['/shipping']);
                  break;
                default:
                  break;
              }
            }
          },1000);
            
        }
        else
        {
          this.router.navigate(['/account/login']);
        }
       
       
    }
    ngOnInit(){
        this._comm.showLoaderObservable$.subscribe(res => {
            if (res) {
              this.showLoader = res.show;
              /*if (this.changeDetectorRef && !this.changeDetectorRef['destroyed']) {
                this.changeDetectorRef.detectChanges();
              }*/
            }
          });
    }
}