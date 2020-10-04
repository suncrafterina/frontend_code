import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { tap  } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class WarehouseService {

	constructor(private http: HttpClient) { }

	getWarehouseList(data: any, params: any){
		return this.http.get(environment.apiUrl+ 'hytx/warehousevendor/api/warehouse',{
		observe: 'response',
		params:new HttpParams()
		.set('search', params.search)
		.set('sort', params.sortField)
		.set('size', params.pageSize.toString())
		.set('page', params.pageIndex.toString())
		}).pipe(tap(data => data));
	}

	getWarehouseDetail(id: any){

		return this.http.get(environment.apiUrl+ 'hytx/warehousevendor/api/warehouse/'+id, {
			observe: 'response'			
		});
	}

	toggleWarehouse(id:any, status: boolean){
		console.log("toggleWarehouse(id:any, status: boolean){");
		return this.http.get(environment.apiUrl+'hytx/warehousevendor/api/warehouse/status/'+id+'/'+status,{
			observe: 'response'
		}).pipe(tap( data => data ));
	}

	addWarehouse(data: any) {
		var formData: any = new FormData();
		let lengthArr = data.value.warehouse_images.length;
		for(let i=0; i < lengthArr; i++){
			formData.append("warehouse_images", data.value.warehouse_images[i]);
			
		}
		formData.append("is_favourite", data.value.is_favourite);
		formData.append("warehouse_name", data.value.warehouse_name);
		formData.append("amenities_facilities", data.value.amenities_facilities);
		formData.append("description", data.value.description);
		formData.append("email_address", data.value.email_address);
		formData.append("phone_number", data.value.phone_number);
		formData.append("address_line_1", data.value.address_line_1);
		formData.append("address_line_2", data.value.address_line_2);
		formData.append("zip_code", data.value.zip_code);
		formData.append("warehouse_size", data.value.warehouse_size);
		formData.append("available_space", data.value.available_space);
		formData.append("city_id", data.value.city);
		formData.append("build_year", data.value.build_year);	
		return this.http.post(environment.apiUrl + 'hytx/warehousevendor/api/warehouse', formData);
	}

	removeImageByID(id:any){
		return this.http.get(environment.apiUrl+'hytx/warehousevendor/api/warehouse/image-remove/'+id,{
			observe: 'response'
		}).pipe(tap(data=>data));
	}

	isFavoriteImageById(id:any, isFavourite: any){
		return this.http.get(environment.apiUrl+'hytx/warehousevendor/api/warehouse/is-fav/'+id+'/'+isFavourite,{
			observe: 'response'
		}).pipe(tap(data=>data));
	}

	editWareHouse(data: any, id: any, disable: any){
		console.log("warehouse", data.value);
		var formData: any = new FormData();
		let lengthArr = data.value.warehouse_images.length;
		let lengthAmenities =  data.value.amenities_facilities.length;
		console.log(disable);
		for(let i =0; i < lengthAmenities; i++ ){
			let typeVar: any = typeof(data.value.amenities_facilities[i]);
			console.log(typeVar);
			if(typeVar === 'object'){
				formData.append("amenities_facilities", data.value.amenities_facilities[i]['amenities_facilities']);
			}else{
				formData.append("amenities_facilities", data.value.amenities_facilities[i]);
			}
		}
		
		for(let i=0; i < lengthArr; i++){
			
			let fileStatus = typeof data.value.warehouse_images[i].name == 'string'; 
			if(fileStatus){
				console.log('inside file');
				formData.append("warehouse_images", data.value.warehouse_images[i]);
				formData.append("is_favourite", false);
			}
		}
		formData.append("warehouse_name", data.value.warehouse_name);
		formData.append("description", data.value.description);
		formData.append("email_address", data.value.email_address);
		formData.append("phone_number", data.value.phone_number);
		formData.append("address_line_1", disable.address_line_1);
		formData.append("address_line_2", disable.address_line_2);
		formData.append("zip_code", disable.zip_code);
		formData.append("warehouse_size",  disable.warehouse_size);
		formData.append("available_space",  disable.available_space);
		formData.append("city_id", disable.city.id);
		formData.append("build_year", disable.build_year);	
		return this.http.put(environment.apiUrl + 'hytx/warehousevendor/api/warehouse/'+id, formData);
	}
}