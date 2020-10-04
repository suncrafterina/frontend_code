import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';
import { tap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: any)
  {
    return this.http.post(environment.apiUrl + 'hytx/factoryvendor/api/product/general-information', data);
  }
  updateProductGeneral(id:any,data: any)
  {
    return this.http.patch(environment.apiUrl + 'hytx/factoryvendor/api/product/general-information/' + id, data);
  }
  getSpecificationDetails(id:any)
  {
    return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/product/specifications/' + id);
  }
  addSpecificationDetails(id:any,data:any)
  {
    return this.http.patch(environment.apiUrl + 'hytx/factoryvendor/api/product/specifications/' + id,data);
  }
  getCategoryList()
  {
    return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/category/list');
  }
  getProductGeneralInformation(id:any)
  {
    return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/product/general-information/'+ id);
  }
  getAttributesAndOptions(id:any)
  {
    return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/category/attributes-and-options/'+ id);
  }
  getProductList(data, params)
  {
    return this.http
    .get(environment.apiUrl + 'hytx/factoryvendor/api/products',{
      observe: 'response',
      params: new HttpParams()
          .set('sort', params.sortField)
          .set('page', params.pageIndex.toString())
          .set('size', params.pageSize.toString())
          .set('search',params.search)
    })
    .pipe(tap (data => data));
  }
  addAttributOption(id:any,data:any)
  {
    return this.http.patch(environment.apiUrl + 'hytx/factoryvendor/api/product/attribute-and-option/' + id,data);
  }
  getAttributOption(id:any)
  {
    return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/product/attribute-and-option/' + id);
  }
  getAdditionalInfo()
  {
    return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/product/additional-info');
  }
  getGalleryDetails(id:any)
  {
    return this.http.get(environment.apiUrl + 'hytx/factoryvendor/api/product/gallery/'+id);
  }
  updateProductImage(id:any,file:any)
  {
    var formData: any = new FormData();
    if(file)
    {
      formData.append("image_file", file);
      return this.http.patch(environment.apiUrl + 'hytx/factoryvendor/api/product/upload-image-file/'+id, formData);
    }
  }
  updateAdditionalProductImage(id:any,file:any)
  {
    var formData: any = new FormData();
    if(file)
    {
      formData.append("image_file", file);
      return this.http.patch(environment.apiUrl + 'hytx/factoryvendor/api/product/upload-additional-file/'+id, formData);
    }
  }
  getProductStatus(id:any,data:any,test:any)
  {
    return this.http.patch(environment.apiUrl + 'hytx/factoryvendor/api/product/change-status/'+ id +'/'+data,test);
  }
  removeImage(id:any)
  {
    return this.http.delete(environment.apiUrl + 'hytx/factoryvendor/api/product/delete-additional-file/'+ id);

  }
  updateVideo(id:any,file:any)
  {
    var formData: any = new FormData();
    if(file)
    {
      formData.append("video_file", file);
      return this.http.patch(environment.apiUrl + 'hytx/factoryvendor/api/product/upload-video-file/'+id, formData);
    }
  }
  
  
}
