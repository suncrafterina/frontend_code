import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';
import { tap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class shippingService {

  constructor(private http: HttpClient) { }

  getShippingLocationList(params, user_id:any,data ) {
    return this.http
      .get(environment.apiUrl + 'hytx/shippingvendor/api/shipping/location' + user_id,{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }

}