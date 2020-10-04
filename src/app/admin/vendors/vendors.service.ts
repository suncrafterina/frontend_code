import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';
import { tap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(private http: HttpClient) { }
  getShipperList(data, params) {
    return this.http
      .get(environment.apiUrl + 'hytx/admin/api/shipper',{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }
  getShipperLocationList(params, user_id:any,data ) {
    return this.http
      .get(environment.apiUrl + 'hytx/admin/api/shipping/location/' + user_id,{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }
  updateShipperCommission(data: any) {
    let id = data.id;
    let comm = data.commission;
    // let finalData =  {id: id, commission: parseFloat(comm)};
    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("commission",  parseFloat(comm));
    //let finalData = JSON.parse(JSON.stringify({"id": id, "commission": parseFloat(comm)}));
    return this.http.put(environment.apiUrl + 'hytx/admin/api/shipper/commission/' + id, formData);
  }
  getShipperCommissionDetails(id: any) {
    return this.http.get(environment.apiUrl + 'hytx/admin/api/shipper/commission/' + id);
  }

  getWarehouseList(data, params) {
    return this.http
      .get(environment.apiUrl + 'hytx/admin/api/warehouse/vendor',{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }

  updateWarhouseCommission(data: any) {
    let id = data.id;
    let comm = data.commission;
    // let finalData =  {id: id, commission: parseFloat(comm)};
    //let finalData = JSON.parse(JSON.stringify({"id": id, "commission": parseFloat(comm)}));
    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("commission",  parseFloat(comm));
   
    return this.http.put(environment.apiUrl + 'hytx/admin/api/warehouse/vendor/commission/' + id, formData);
  }
  

  getFactoryList(data, params) {
    return this.http
      .get(environment.apiUrl + 'hytx/admin/api/factory-vendor',{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }
  updateFactoryCommission(data: any) {
    return this.http.put(environment.apiUrl + 'hytx/admin/api/factory-vendor/commission', data);
  }
  // getFactroyCommissionDetails(id: any, data) {
  //   return this.http.get(environment.apiUrl + 'hytx/admin/api/category-commission/' + id, data);
  // }


  getFactroyCommissionDetails(params, id:any) {
    return this.http
      .get(environment.apiUrl + 'hytx/admin/api/factory-vendor/commission/' + id,{
        observe: 'response',
        params: new HttpParams()
            .set('category_id', params.category_id)
           
      })
      .pipe(tap (data => data));
  }


  getWarehouseStatus(id: any,data) {
    return this.http.get(environment.apiUrl + 'hytx/admin/api/warehouse/vendor/status/' + id +'/' +data);
  }
  getShippingStatus(id: any,data) {
    return this.http.get(environment.apiUrl + 'hytx/admin/api/shipper/status/' + id +'/' +data);
  }
  getFactoryStatus(id: any,data) {
    return this.http.get(environment.apiUrl + 'hytx/admin/api/factory-vendor/status/' + id +'/' +data);
  }
 

  getWarehouseVendor(params, user_id:any, data ) {
    return this.http
      .get(environment.apiUrl + 'hytx/admin/api/warehouse/' + user_id,{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }

  getWarehouseDetails(id: any) {
    return this.http.get(environment.apiUrl + 'hytx/admin/api/warehouse/detail/' + id,{
      observe: 'response'
    });
  }
  getCategoryList() {
    return this.http.get(environment.apiUrl + 'hytx/admin/api/category');
  }

  getProductList(id:any, data, params)
  {
    return this.http
    .get(environment.apiUrl + 'hytx/admin/api/factory-vendor/products/' +id,{
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