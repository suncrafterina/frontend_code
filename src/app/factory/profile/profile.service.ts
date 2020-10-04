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
    return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/profile/'); 
  }
  getPaymentData(){
    return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/payment-setting'); 
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

  updateUserProfile(data: any,selectFile:any,id:any,companySelectFile:any,companyBannerSelectFile:any)
  {
    var formData: any = new FormData();
    formData.append("first_name", data.first_name.trim());
    formData.append("last_name", data.last_name);
    formData.append("city_id", data.city);
    formData.append("email", data.email);
    formData.append("id", id);
    formData.append("description", data.description);
    formData.append("factory_name", data.factory_name);
    formData.append("phone_number", data.phone_number);
    formData.append("type_of_business", data.type_of_business);
    formData.append("zip_code", data.zip_code);
    formData.append("address_line_1", data.address_line_1);
    formData.append("address_line_2", data.address_line_2);
    formData.append("agent_code", data.agent_code);
    if(selectFile)
    {
      formData.append("profile_image", selectFile);
    }
    if(companySelectFile)
    {
      formData.append("company_logo", companySelectFile);
    }
    if(companyBannerSelectFile)
    {
      formData.append("company_banner", companyBannerSelectFile);
    }
    return this.http.put(environment.apiUrl + 'hytx/factoryvendor/api/profile', formData);
  }
  updateUserPayment(data: any)
  {
    return this.http.put(environment.apiUrl + 'hytx/factoryvendor/api/payment-setting', data);
  }
  getOtherData(){
    return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/other-setting'); 
  }
  updateUserOther(data: any)
  {
    if(data.is_change_password == true)
    {
      const postData = data;
      return this.http.put(environment.apiUrl + 'hytx/factoryvendor/api/other-setting', postData);
    }else
    {
      const postData =  JSON.parse(JSON.stringify({language:data.language}));
      return this.http.put(environment.apiUrl + 'hytx/factoryvendor/api/other-setting', postData);
    }
  }
  updateAccountUserOther(data: any)
  {
    return this.http.put(environment.apiUrl + 'hytx/factoryvendor/api/other-setting', data);
  }
  
  
}
