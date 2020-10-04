import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../_services';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService,
        private _auth: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this._auth.userData;
        if (user) {
            const role = this._auth.getUserRole();
            // console.log(route.data);
            if (route.data.authorities && route.data.authorities.length > 0 && route.data.authorities.indexOf(role) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['dashboard']);
                return false;
              }
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //      this.User = this._auth.userValue;
    //     //console.log("this.userSubject.value", this.User)
    //     if ( this.User) {
    //         // check if route is restricted by role
    //         // if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
    //         //     // role not authorised so redirect to home page
    //         //     this.router.navigate(['/']);
    //         //     return false;
    //         // }

    //         // authorised so return true
    //         return false;
    //     }

    //     // not logged in so redirect to login page with the return url
    //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    //     return false;
    // }

}