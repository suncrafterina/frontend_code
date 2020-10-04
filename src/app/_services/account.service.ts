import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private _auth: AuthenticationService,
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userDetails')));
        this.user = this.userSubject.asObservable();
        
    }

    public get userValue(): User {
       // console.log(this.userSubject);
        return this.userSubject.value;
       
    }

    // login(data: any) {
    //     let headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     return this.http.post(environment.apiUrl + 'auth/login', data,{ headers, withCredentials: true });
    //   }



    //   login(username: string, password: string) {
    //     return this.http.post<any>(environment.apiUrl + 'auth/login', { username, password })
    //         .pipe(map(user => {
    //             // login successful if there's a jwt token in the response
    //             if (user && user.token) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify(user));
    //                 this.userSubject.next(user);
    //             }

    //             return user;
    //         }));
    // }


    AccountUserData(data: any):Observable<any>{
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(environment.apiUrl + 'api/account-info', { headers, withCredentials: true });
      }
    forgotPassword(data: any):Observable<any>{
        return this.http.post(environment.apiUrl + 'hytx/authuaaserver/api/forgot-password', data);
      }

    resendCode(data: any) {
        return this.http.post(environment.apiUrl + 'hytx/authuaaserver/api/resend-code', data);
      }
    resendAccount(data: any) {
        return this.http.post(environment.apiUrl + 'hytx/authuaaserver/api/resend-verification', data);
      }
    verifyCode(data: any) {
        return this.http.post(environment.apiUrl + 'api/verify-code', data);
      }
    resetPassword(data: any) {
        return this.http.post(environment.apiUrl + 'hytx/authuaaserver/api/reset-password', data);
      }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(data: any) {
        return this.http.post(environment.apiUrl + 'api/register-user', data);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }

    getMenu(): Observable<any> {
        return this.http
          .get('assets/data/main-menu.json')
          .pipe(map(data => data));
    }
    getFactoryMenu(): Observable<any> {
        return this.http
          .get('assets/data/factory-menu.json')
          .pipe(map(data => data));
    }
    getWarehouseMenu(): Observable<any> {
        return this.http
          .get('assets/data/warehouse-menu.json')
          .pipe(map(data => data));
    }
    getShippingMenu(): Observable<any> {
        return this.http
          .get('assets/data/shipping-menu.json')
          .pipe(map(data => data));
    }
    getProductStatus(id: any) {
        return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/product/info-status/'+ id);
      }
    getAccountStatus(services)
    {
        return this.http.get(environment.apiUrl + 'hytx/'+services+'/api/profile-status');
    }
}