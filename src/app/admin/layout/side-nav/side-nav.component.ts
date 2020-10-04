import { Component, OnInit } from '@angular/core';
import { childRoutes } from '../../child-routes';
import {AccountService} from '../../../_services/account.service'
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  showMenu = false;
  routes = childRoutes;
  constructor(private accountService: AccountService, 
             private _auth: AuthenticationService,
             private router: Router,
             ) {}

  ngOnInit() {}

  logout()
  {
    
    
    // this.accountService.logout();
    this._auth.logout()
      .subscribe(
        (data: any) => {
        },
        error => {
        });
  }
}
