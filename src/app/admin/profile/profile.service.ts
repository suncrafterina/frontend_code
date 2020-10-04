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
    return this.http.get(environment.apiUrl + 'api/admin/profile'); 
  }

  updateUserProfile(data: any,selectFile:any)
  {
    var formData: any = new FormData();
    formData.append("first_name", data.first_name.trim());
    formData.append("last_name", data.last_name);
    formData.append("language", data.language);
    formData.append("email", data.email);
    formData.append("is_change_password", data.is_change_password);
    formData.append("current_password", data.current_password);
    formData.append("new_password", data.password);
    if(selectFile)
    {
      formData.append("image_url", selectFile);
    }
    return this.http.put(environment.apiUrl + 'api/admin/profile', formData);
  }
  
}
