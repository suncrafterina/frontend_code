import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { tap  } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class QuotationService {

    constructor(private http: HttpClient) { }
         getQuotationList(data: any, params: any){
		return this.http.get(environment.apiUrl+ 'hytx/shippingvendor/api/quotation',{
		observe: 'response',
		params:new HttpParams()
		.set('search', params.search)
		.set('sort', params.sortField)
		.set('size', params.pageSize.toString())
		.set('page', params.pageIndex.toString())
		}).pipe(tap(data => data));
	}
	getQuotationData(orderId: any){

		return this.http.get(environment.apiUrl+ 'hytx/shippingvendor/api/quotation/order/'+orderId, {
			observe: 'response'			
		});
	}
	getProposalWarehouse(){

		return this.http.get(environment.apiUrl+ 'hytx/warehousevendor/api/proposal/user-warehouse', {
			observe: 'response'			
		});
	}

	updateQuotationForm(data: any) {
		const finadata ={
			"order_code":data.order_code,
			"from_date":data.from_date,
			"to_date":data.to_date,
			"warehouse_id":data.warehouse_id,
			"amount":data.amount
		}
		return this.http.post(environment.apiUrl + 'hytx/shippingvendor/api/quotation', finadata);
	  }
	  getOrderDetails(id:any)
	{
	  return this.http.get(environment.apiUrl + 'hytx/shippingvendor/api/quotation/detail/'+ id);
	}
	getOrderDetailsItems(id:any)
	{
	  return this.http.get(environment.apiUrl + 'hytx/shippingvendor/api/quotation/items/'+ id);
	}
	getOrderLog(id:any)
	{
	  return this.http.get(environment.apiUrl + 'hytx/shippingvendor/api/quotation/log/'+ id);
	}
	
	updateQuotation(id: any, data: any){
		// var formData: any = new FormData();
		// formData.append("order_status", data.order_status);
		const finalData  = {
			"order_status":data.order_status,
		}
		return this.http.put(environment.apiUrl+ 'hytx/shippingvendor/api/quotation/shipping-status/'+id, finalData)
		}

		// updateQuotation(data: any) {
		// 	let id = data.id;
		// 	let status = data.order_status;
		// 	// let finalData =  {id: id, commission: parseFloat(comm)};
		// 	let finalData = { "order_status": status};
		// 	return this.http.get(environment.apiUrl + 'hytx/shippingvendor/api/quotation/shipping-status/' + id, finalData);
		//   }
}