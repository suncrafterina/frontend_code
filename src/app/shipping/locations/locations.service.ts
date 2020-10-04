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

  getShippingLocationList(data, params) {
    return this.http
      .get(environment.apiUrl + 'hytx/shippingvendor/api/shipping/location',{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }
  getShippingStatus(id: any,data) {
    return this.http.get(environment.apiUrl + 'hytx/shippingvendor/api/shipping/location/' + id +'/' +data);
  }

  getCountries(){
		return this.http.get(environment.apiUrl+'hytx/authuaaserver/api/country',{
			observe: 'response'
		}).pipe(tap(data => data));
	}

	getStates(id: any){
		return this.http.get(environment.apiUrl+'hytx/authuaaserver/api/state/'+id,{
			observe: 'response'
		}).pipe(tap(data => data));
	}

	getCities(id: any){
		return this.http.get(environment.apiUrl+'hytx/authuaaserver/api/city/'+id,{
			observe: 'response'
		}).pipe(tap(data => data));
	}
  updateLocation(data: any, id:any) {
    var formData: any = new FormData();
    formData.append("city_id", data.city_id);
    formData.append("zip_code", data.zip_code);
    formData.append("id", data.id);
    return this.http.put(environment.apiUrl + 'hytx/shippingvendor/api/shipping/location/' +id, formData);
  }

  
  addLocation(data: any) {
    var formData: any = new FormData();
    formData.append("city_id", data.city_id);
    formData.append("zip_code", data.zip_code);
    //formData.append("avatar", this.form.get('avatar').value);
    return this.http.post(environment.apiUrl + 'hytx/shippingvendor/api/shipping/location', formData);
  }

  updateCategory(data: any) {
    var formData: any = new FormData();
    formData.append("title", data.title.trim());
    formData.append("category_level", data.category_level);
    formData.append("parent_id", data.parent_id);
    formData.append("sorting_order", data.sorting_order);
    return this.http.put(environment.apiUrl + 'hytx/admin/api/category/'+data.id, formData);
  }

  getLocationByID(id: any){
		return this.http.get(environment.apiUrl+'hytx/shippingvendor/api/shipping/location/'+id,{
			observe: 'response'
		}).pipe(tap(data => data));
	}

}