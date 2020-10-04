import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';
import { tap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  
  getProductList(data, params)
  {
    return this.http
    .get(environment.apiUrl + 'hytx/admin/api/products',{
      observe: 'response',
      params: new HttpParams()
          .set('sort', params.sortField)
          .set('page', params.pageIndex.toString())
          .set('size', params.pageSize.toString())
          .set('search',params.search)
    })
    .pipe(tap (data => data));
  }
 
 
  
  getProductStatus(id:any,data:any,test:any)
  {
    return this.http.patch(environment.apiUrl + 'hytx/admin/api/product/change-status/'+ id +'/'+data,test);
  }
  getSponsoredProductStatus(id:any,data:any,test:any)
  {
    return this.http.put(environment.apiUrl + 'hytx/admin/api/product/sponsored/'+ id +'/'+data,test);
  }
  getNewArrivalProductStatus(id:any,data:any,test:any)
  {
    return this.http.put(environment.apiUrl + 'hytx/admin/api/product/new-arrival/'+ id +'/'+data,test);
  }
  getProductDetails(id:any)
  {
    return this.http.get(environment.apiUrl + 'hytx/admin/api/product/'+ id);
  }
  
}
