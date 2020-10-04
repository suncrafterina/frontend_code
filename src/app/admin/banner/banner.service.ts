import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { tap  } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  constructor(private http: HttpClient) {}
  getBannerList(data, params) {
		return this.http  
		.get(environment.apiUrl + 'hytx/admin/api/banner',{
			observe: 'response',
			params: new HttpParams()
				.set('sort', params.sortField)
				.set('page', params.pageIndex.toString())
				.set('size', params.pageSize.toString())
				.set('search',params.search)
		})
		.pipe(tap (data => data));
  }
 
  getBannerDetail(id: any){
		return this.http.get(environment.apiUrl + 'hytx/admin/api/banner/'+id,{
			observe: 'response'});

	}
	addBanner(data: any,image:any) {
		var formData: any = new FormData();
		formData.append("banner_type", data.banner_type);
		formData.append("type_id", data.type_id);
		if(image)
		{
		  formData.append("image_file", image);
		}
		return this.http.post(environment.apiUrl + 'hytx/admin/api/banner', formData);
	}

	editBanner( id: any, data: any,image:any){
		var formData: any = new FormData();
		formData.append("id", id);
		formData.append("type_id", data.type_id);
		if(image)
		{
		  formData.append("image_file", image);
		}
		return this.http.put(environment.apiUrl+ 'hytx/admin/api/banner', formData);
	}
	getBannerSearch(search:any,type:any)
	{
		return this.http.get(environment.apiUrl+ 'hytx/admin/api/search/'+type+'/'+ search);
	}
	delete(id: any){
		return this.http.delete(environment.apiUrl+ 'hytx/admin/api/banner/'+id);
	}
	statusChange(id:any,data:any,test:any) {
		return this.http.put(environment.apiUrl + 'hytx/admin/api/banner/status/' + id +'/' +data,test);
	  }
	
}
