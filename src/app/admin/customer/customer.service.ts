import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap  } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  
  getCustomerList(data, params){
		return this.http.get(environment.apiUrl+ 'hytx/admin/api/customer',{
			observe: 'response',
			params: new HttpParams()
				.set('sort', params.sortField)
				.set('page', params.pageIndex.toString())
				.set('size', params.pageSize.toString())
				.set('search',params.search)
		}).pipe(tap (data=>data));
	}
	getCustomerStatus(id: any,data) {
		return this.http.get(environment.apiUrl + 'hytx/admin/api/customer/status/' + id +'/' +data);
	  }

	  addCustomer(data: any) {
		const finadata ={
			"first_name":data.first_name,
			"last_name":data.last_name,
			"email":data.email,
			"phone_number":data.phone_number,
			"password":data.password,
			"confirm_password":data.confirm_password
		}
		return this.http.post(environment.apiUrl + 'hytx/admin/api/customer', finadata);
	  }
	  getorderDetails(id){
		return this.http.get(environment.apiUrl + 'hytx/admin/api/customer-detail/' + id);
	}
	getorderList(data, params,id)
	{
	  return this.http.get(environment.apiUrl+ 'hytx/admin/api/customer-orders/'+id,{
	  	observe: 'response',
	  	params: new HttpParams()
	  		.set('sort', params.sortField)
	  		.set('page', params.pageIndex.toString())
	  		.set('size', params.pageSize.toString())
	  		.set('search',params.search)
	  }).pipe(tap (data=>data));
  }
}
