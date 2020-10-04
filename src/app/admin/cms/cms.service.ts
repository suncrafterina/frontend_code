import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap  } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CmsService {

	constructor(private http: HttpClient) { }

	getCMSList(data, params){
		return this.http.get(environment.apiUrl+ 'hytx/admin/api/cms',{
			observe: 'response',
			params: new HttpParams()
				.set('sort', params.sortField)
				.set('page', params.pageIndex.toString())
				.set('size', params.pageSize.toString())
				.set('search',params.search)
		}).pipe(tap (data=>data));
	}
	getCMSBySlug(slug: any){
		return this.http.get(environment.apiUrl + 'hytx/admin/api/cms/'+ slug, {
			observe: 'response'
		});
	}

	editCMS( slug: any, data: any){
		return this.http.put(environment.apiUrl+ 'hytx/admin/api/cms/'+slug, data);
	}
	
}
