import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { tap  } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) {}
  getClientList(data, params) {
		return this.http.get(environment.apiUrl + 'hytx/admin/api/client',{
			observe: 'response',
			params: new HttpParams()
				.set('sort', params.sortField)
				.set('page', params.pageIndex.toString())
				.set('size', params.pageSize.toString())
				.set('search',params.search)
		})
		.pipe(tap (data => data));
  }
 
  getClientDetail(id: any){
		return this.http.get(environment.apiUrl + 'hytx/admin/api/client/'+id,{
			observe: 'response'});

	}
	addClient(data: any,image:any) {
		var formData: any = new FormData();
		formData.append("title", data.title);
		if(image)
		{
		  formData.append("image_file", image);
		}
		return this.http.post(environment.apiUrl + 'hytx/admin/api/client', formData);
	}

	editClient( id: any, data: any,image:any){
		var formData: any = new FormData();
		formData.append("title", data.title);
		formData.append("id", id);
		if(image)
		{
		  formData.append("image_file", image);
		}
		return this.http.put(environment.apiUrl + 'hytx/admin/api/client', formData);
		
	}
	getClientStatus(id:any,data:any,test:any) {
		return this.http.put(environment.apiUrl + 'hytx/admin/api/client/status/' + id +'/' +data,test);
	  }
	  deleteClient(id: any){
		return this.http.delete(environment.apiUrl+ 'hytx/admin/api/client/'+id);
	}
	
	
}

