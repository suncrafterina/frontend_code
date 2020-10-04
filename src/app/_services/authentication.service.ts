import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  //private loginNotify =  BehaviorSubject<any>;
 // loginObservable$ = this.loginNotify.asObservable();
    constructor(
      private router: Router,
      private http: HttpClient
  ) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.user = this.userSubject.asObservable();
  }
  public get userData(): User {
    return this.userSubject.value;
  }
  
  login(userName: string, passwordLog: string) {
    const username =  userName.trim();
    const password = passwordLog.trim();
    return this.http.post<any>(environment.apiUrl + 'api/authenticate', { username, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.userSubject.next(user);
            }

            return user;
        }));
}

  getLoginUserDetails() {
    let userDetails;
    const loginUser = localStorage.getItem('userDetails');
    if (loginUser) {
      userDetails = JSON.parse(loginUser);
    }
    return userDetails;
  }

  isLoggedIn() {
    const loginUser = localStorage.getItem('user');
    if (loginUser) {
      return JSON.parse(loginUser);
    } else {
      return false;
    }
  }

  decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  // loginNotifyNext(data: any) {
  //   if (data) {
  //     this.loginNotify.next(data);
  //   }
  // }

  getUserRole() {
    const userDetails = this.getLoginUserDetails();
    if (userDetails && userDetails.role) {
      return userDetails.role;
    }
  }
  logout():Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.userSubject.next(null);
    localStorage.clear();
    return this.http.post(environment.apiUrl + 'auth/logout', { headers, withCredentials: true });
  }
}
