import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

	getOrderList(data: any, params: any){
		return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/orders',{
			observe:'response',
			params: new HttpParams()
			.set('size', params.pageSize.toString())
			.set('search', params.search)
			.set('page', params.pageIndex.toString())
			.set('sort', params.sortField)
		}).pipe(tap(data=> data));
	}
	getTransactionList(data: any, params: any){
		return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/transactions',{
			observe:'response',
			params: new HttpParams()
			.set('size', params.pageSize.toString())
			.set('search', params.search)
			.set('page', params.pageIndex.toString())
			.set('sort', params.sortField)
			.set('from_date',params.from_to)
			.set('to_date',params.to_date)
		}).pipe(tap(data=> data));
	}
	getDownloadTransation(params: any){
		return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/download-transactions',{
			responseType: 'blob' as 'json',
        	observe: 'response' as 'body',
			params: new HttpParams()
			.set('user_type',params.user_type)
			.set('from_date',params.from_to)
			.set('to_date',params.to_date)
		});
	}
	getOrderDetails(id:any)
	{
	  return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/order/'+ id);
	}

}
