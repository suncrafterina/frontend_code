import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class EnquiryService {

	constructor(private http: HttpClient) { }

	getEnquiryList(data: any, params: any){
		return this.http.get(environment.apiUrl + 'hytx/admin/api/enquiry',{
			observe:'response',
			params: new HttpParams()
			.set('size', params.pageSize.toString())
			.set('search', params.search)
			.set('page', params.pageIndex.toString())
			.set('sort', params.sortField)
		}).pipe(tap(data=> data));
	}

	getEnquiryDetail(id: any){
		return this.http.get(environment.apiUrl + 'hytx/admin/api/enquiry/'+id,{
			observe: 'response'
		});
	}

	giveEnquiryReply(data: any){
		console.log("giveEnquiryReply(data: any)");
		console.log(data);
		return this.http.put(environment.apiUrl+'hytx/admin/api/enquiry', data.value,{
			observe: 'response'
		});
	}
}
