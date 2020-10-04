import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';
import { tap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }
 
  getRequestsList(data, params) {
    return this.http
      .get(environment.apiUrl + 'hytx/admin/api/request',{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }
  getAcceptRequests(id: any,data:any) {
    return this.http.put(environment.apiUrl + 'hytx/admin/api/request-accepted/' + id, data);
  }
  getDeclinedRequests(id: any, data:any) {
    return this.http.put(environment.apiUrl + 'hytx/admin/api/request-declined/' + id, data);
  }
}