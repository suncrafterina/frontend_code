import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AccountService } from '../_services';
import { AuthenticationService } from '../_services/authentication.service';
import {TranslateService} from '@ngx-translate/core';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    languageSet:any = 'en';
    constructor(private accountService: AccountService,public translate: TranslateService,private tokenExtractor: HttpXsrfTokenExtractor,  private _auth: AuthenticationService ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const usertoken =  this._auth.userData;
        const userDetails =  this._auth.getLoginUserDetails();
        if(userDetails)
        {
            this.languageSet = userDetails.lang;
            //this.translate.use(this.languageSet);
        }
        const isLoggedIn = usertoken && usertoken.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        let token = this.tokenExtractor.getToken() as string;
        if (isLoggedIn) {
            request = request.clone({
                withCredentials: true,
                setHeaders: {
                    Authorization : `Bearer ${usertoken.token}`,
                    'Accept-Language': this.languageSet,
                    // responseType: 'response'
                   // 'XSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    //'Cookie' : `token = ${user.access_token}`
                }
            });
        }

        return next.handle(request);
    }
}