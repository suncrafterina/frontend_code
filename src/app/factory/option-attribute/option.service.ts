import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class OptionService {

	constructor(private http: HttpClient) { }

	getOptionsList(data: any, params: any){
		return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/request',{
			observe: 'response',
			params: new HttpParams()
			.set('sort', params.sortField)
			.set('page', params.pageIndex.toString())
			.set('size', params.pageSize.toString())
			.set('search',params.search)
		}).pipe(tap( data => data ));
	}

	getOptionsListById(id: any){
		return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/attributes-options/'+id,{
			observe: 'response'
		}).pipe(tap(data => data));
	}

	getAllCategories(){
		return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/category',{
			observe: 'response'
		});
	}
	getAllSubCategories(id: any){
		return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/category/level-two/'+id,{
			observe: 'response'
		});
	}

	editAttributeOrOption(element: any, arrvalue: any){
		// console.log(element);
		let finalBody = {
			id: element.element.id,
			type: element.element.type,
			title: element.element.title,			
			values: arrvalue,
			category_id: element.element.category_id
		};
		let body = JSON.parse(JSON.stringify(finalBody));
		// console.log(body);
		return this.http.post(environment.apiUrl + 'hytx/factoryvendor/api/request', body,{
			observe: 'response'
		});
	}

	addAttribute(data: any){
		return this.http.post(environment.apiUrl + 'hytx/factoryvendor/api/request', data, {
			observe: 'response'
		});
	}
}
