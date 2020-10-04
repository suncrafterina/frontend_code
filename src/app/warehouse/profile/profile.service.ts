import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';
import { tap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  getUserData(id:any){
    return this.http.get(environment.apiUrl + 'hytx/warehousevendor/api/profile/'); 
  }
  getPaymentData(){
    return this.http.get(environment.apiUrl + 'hytx/warehousevendor/api/payment-setting'); 
  }
  getCountryList()
  {
    return this.http.get(environment.apiUrl + 'hytx/authuaaserver/api/country'); 
  }
  getStateList(id:any)
  {
    return this.http.get(environment.apiUrl + 'hytx/authuaaserver/api/state/'+id); 
  }
  getCityList(id:any)
  {
    return this.http.get(environment.apiUrl + 'hytx/authuaaserver/api/city/'+id); 
  }

  updateUserProfile(data: any,selectFile:any,id:any,companySelectFile:any)
  {
    console.log(data);
    var formData: any = new FormData();
    formData.append("first_name", data.first_name.trim());
    formData.append("last_name", data.last_name);
    formData.append("city_id", data.city);
    formData.append("email", data.email);
    formData.append("id", id);
    formData.append("phone_number", data.phone_number);
    formData.append("zip_code", data.zip_code);
    formData.append("billing_address_1", data.billing_address_1);
    formData.append("billing_address_2", data.billing_address_2);
    formData.append("organization_name", data.organization_name);
    if(selectFile)
    {
      formData.append("profile_image", selectFile);
    }
    if(companySelectFile)
    {
      formData.append("company_logo", companySelectFile);
    }
    return this.http.put(environment.apiUrl + 'hytx/warehousevendor/api/profile', formData);
  }
  updateUserPayment(data: any)
  {
    return this.http.put(environment.apiUrl + 'hytx/warehousevendor/api/payment-setting', data);
  }
  getOtherData(){
    return this.http.get(environment.apiUrl + 'hytx/warehousevendor/api/other-setting'); 
  }
  updateUserOther(data: any)
  {
    if(data.is_change_password == true)
    {
      const postData = data;
      return this.http.put(environment.apiUrl + 'hytx/warehousevendor/api/other-setting', postData);
    }else
    {
      const postData =  JSON.parse(JSON.stringify({language:data.language}));
      return this.http.put(environment.apiUrl + 'hytx/warehousevendor/api/other-setting', postData);
    }
    
    
  }
  updateAccountUserOther(data: any)
  {
    return this.http.put(environment.apiUrl + 'hytx/warehousevendor/api/other-setting', data);
  }
  getCountries(){
		return this.http.get(environment.apiUrl+'hytx/authuaaserver/api/country',{
			observe: 'response'
		}).pipe(tap(data => data));
	}

	getStates(id: any){
		return this.http.get(environment.apiUrl+'hytx/authuaaserver/api/state/'+id,{
			observe: 'response'
		}).pipe(tap(data => data));
	}

	getCities(id: any){
		return this.http.get(environment.apiUrl+'hytx/authuaaserver/api/city/'+id,{
			observe: 'response'
		}).pipe(tap(data => data));
	}
  
  
}
