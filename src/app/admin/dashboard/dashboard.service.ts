import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

	getTopCustomerList(){
		return this.http.get(environment.apiUrl + 'api/admin/top-customers',{
			observe: 'response'
		});
	}
	getCountList(){
		return this.http.get(environment.apiUrl + 'api/admin/count-list',{
			observe: 'response'
		});
	}
	getTopSellingProductList(){
		return this.http.get(environment.apiUrl + 'api/admin/top-selling-products',{
			observe: 'response'
		});
	}
	getSalesGraph(year)
	{
		return this.http.get(environment.apiUrl + 'api/admin/sale-graph/'+ year,{
			observe: 'response'
		});

	}
}
