import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { ConstantService } from 'src/app/_service/constant.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
  userPosition = localStorage.getItem('userPosition');
  profileUrl = localStorage.getItem('profileUrl');
  userAvatar = JSON.parse(localStorage.getItem('userAvatar'));
  userRoles: any =[];
  userLabel: any = [];
  constructor(private _auth: AuthenticationService, private _constant: ConstantService) { }

  ngOnInit() {
  	this._auth.loginObservable$.subscribe(res => {
      if (res && res.status) {
        this.userAvatar = JSON.parse(localStorage.getItem('userAvatar'));
      }
    });
    this.userRoles = this.objectFlip(this._constant.userRoles);
    this.userLabel = this._constant.userLabel;
  }

  objectFlip(obj) {
    return Object.keys(obj).reduce((ret, key) => {
      ret[obj[key]] = key;
      return ret;
    }, {});
  }
}
