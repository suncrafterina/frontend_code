import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

	getEnquiryList(){
		return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/new-enquiry',{
			observe: 'response'
		});
	}
	getCountList(){
		return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/count-list',{
			observe: 'response'
		});
	}
	getTopSellingList(){
		return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/top-sellings',{
			observe: 'response'
		});
	}
}
