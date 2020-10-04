import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';
import { tap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}
  getCategoryList(data, params) {
    return this.http
      .get(environment.apiUrl + 'api/admin/category-level-one',{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }

  getCategoryDetails(id: any) {
    return this.http.get(environment.apiUrl + 'api/admin/category/' + id);
  }

  addCategory(data: any,image:any,icon:any) {
    var formData: any = new FormData();
    formData.append("title", data.title.trim());
    formData.append("category_level", data.category_level);
    formData.append("parent_id", data.parent_id);
    formData.append("sorting_order", data.sorting_order);
    if(image)
    {
      formData.append("image_file", image);
    }
    if(icon)
    {
      formData.append("icon_file", icon);
    }
    //formData.append("avatar", this.form.get('avatar').value);
    return this.http.post(environment.apiUrl + 'api/admin/category', formData);
  }

  updateCategory(data: any,image:any,icon:any) {
    var formData: any = new FormData();
    formData.append("title", data.title.trim());
    formData.append("category_level", data.category_level);
    formData.append("parent_id", data.parent_id);
    formData.append("sorting_order", data.sorting_order);
    if(image)
    {
      formData.append("image_file", image);
    }
    if(icon)
    {
      formData.append("icon_file", icon);
    }
    return this.http.put(environment.apiUrl + 'api/admin/category/'+data.id, formData);
  }
  parse_link_header(header) {
    if (header.length == 0) {
      return ;
    }
    let parts = header.split(',');
    var links = {};
    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });
    return links;
  }

  getsubcategoryList(data, params,cateId) {
    return this.http
      .get(environment.apiUrl + 'api/admin/category-level-two/'+cateId+'/',{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }

  getsubcategoryListLeve3(data, params,cateId) {
    return this.http
      .get(environment.apiUrl + 'hytx/admin/api/category/category-level-three/'+cateId+'/',{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }
 
  addOption(data: any) {
    return this.http.post(environment.apiUrl + 'hytx/admin/api/option', data);
  }

  getOptionList(data, params,subcateId)
  {
    return this.http
      .get(environment.apiUrl + 'hytx/admin/api/all-option/'+subcateId+'/',{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }
  updateOption(data: any) {
    return this.http.put(environment.apiUrl + 'hytx/admin/api/option',data);
  }
  getOptionDetails(id: any) {
    return this.http.get(environment.apiUrl + 'hytx/admin/api/option/' + id);
  }

  addAttribute(data: any) {
    return this.http.post(environment.apiUrl + 'hytx/admin/api/attribute', data);
  }

  getAttributeList(data, params,subcateId)
  {
    return this.http
      .get(environment.apiUrl + 'hytx/admin/api/all-attribute/'+subcateId+'/',{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }
  getAttributeDetails(id: any) {
    return this.http.get(environment.apiUrl + 'hytx/admin/api/attribute/' + id);
  }
  updateAttribute(data: any) {
    return this.http.put(environment.apiUrl + 'hytx/admin/api/attribute',data);
  }
 
  getCategoryCommission(data, params) {
    return this.http
      .get(environment.apiUrl + 'hytx/admin/api/category-commission',{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }
  
  updateCategoryCommission(data: any, id:any) {
    return this.http.put(environment.apiUrl + 'hytx/admin/api/category-commission/' + id,data);
  }
  getcatCommissionDetails(id: any) {
    return this.http.get(environment.apiUrl + 'hytx/admin/api/category-commission/' + id);
  }
  getOthersCommission() {
    return this.http
      .get(environment.apiUrl + 'hytx/admin/api/commission',{
        observe: 'response',     
      })
      .pipe(tap (data => data));
  }
  updateOthersCommission(data: any) {
    return this.http.put(environment.apiUrl + 'hytx/admin/api/commission',data);
  }
  getOthersCommissionDetails(id: any) {
    return this.http.get(environment.apiUrl + 'hytx/admin/api/commission/' + id);
  }
  getShipperList(data, params) {
    return this.http
      .get(environment.apiUrl + 'hytx/admin/api/shipper',{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }

  getShipperLocationList(params, user_id:any,data ) {
    return this.http
      .get(environment.apiUrl + 'hytx/admin/api/shipping/location/' + user_id,{
        observe: 'response',
        params: new HttpParams()
            .set('sort', params.sortField)
            .set('page', params.pageIndex.toString())
            .set('size', params.pageSize.toString())
            .set('search',params.search)
      })
      .pipe(tap (data => data));
  }
}
