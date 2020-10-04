import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { tap  } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';
@Injectable({
	providedIn: 'root'
})
export class FaqService {

	constructor(private http: HttpClient) {}

	getFAQList(data, params) {
		console.log(params.search);
		return this.http  
		.get(environment.apiUrl + 'hytx/admin/api/faq',{
			observe: 'response',
			params: new HttpParams()
				.set('sort', params.sortField)
				.set('page', params.pageIndex.toString())
				.set('size', params.pageSize.toString())
				.set('search',params.search)
		})
		.pipe(tap (data => data));
	}

	getFAQDetail(id: any){
		return this.http.get(environment.apiUrl + 'hytx/admin/api/faq/'+id,{
			observe: 'response'});

	}
	addFAQ(data: any) {

		return this.http.post(environment.apiUrl + 'hytx/admin/api/faq', data);
	}

	editFAQ( id: any, data: any){
		return this.http.put(environment.apiUrl+ 'hytx/admin/api/faq/'+id, data);
	}
	
	deleteFAQ(id: any){
		return this.http.delete(environment.apiUrl+ 'hytx/admin/api/faq/'+id);
	}
}
