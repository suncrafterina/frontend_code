import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { tap  } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ProposalsService {

    constructor(private http: HttpClient) { }
      getProposalsList(data: any, params: any){
		return this.http.get(environment.apiUrl+ 'hytx/warehousevendor/api/proposal',{
		observe: 'response',
		params:new HttpParams()
		.set('search', params.search)
		.set('sort', params.sortField)
		.set('size', params.pageSize.toString())
		.set('page', params.pageIndex.toString())
		}).pipe(tap(data => data));
	}
	getProposalData(orderId: any){

		return this.http.get(environment.apiUrl+ 'hytx/warehousevendor/api/proposal/order/'+orderId, {
			observe: 'response'			
		});
	}
	getProposalWarehouse(){

		return this.http.get(environment.apiUrl+ 'hytx/warehousevendor/api/proposal/user-warehouse', {
			observe: 'response'			
		});
	}

	updateProposalsForm(data: any) {
		// var formData: any = new FormData();
		// formData.append("order_code", data.order_code);
		// formData.append("from_date", data.from_date);
		// formData.append("to_date", data.to_date);
		// formData.append("warehouse_id", data.warehouse_id);
		// formData.append("amount", data.amount);
		const finadata ={
			"order_code":data.order_code,
			"from_date":data.from_date,
			"to_date":data.to_date,
			"warehouse_id":data.warehouse_id,
			"amount":data.amount
		}
		return this.http.post(environment.apiUrl + 'hytx/warehousevendor/api/proposal', finadata);
	  }

	  getOrderDetails(id:any)
	  {
		return this.http.get(environment.apiUrl + 'hytx/warehousevendor/api/proposal/detail/'+ id);
	  }
	  getOrderDetailsItems(id:any)
	  {
		return this.http.get(environment.apiUrl + 'hytx/warehousevendor/api/proposal/items/'+ id);
	  }
}