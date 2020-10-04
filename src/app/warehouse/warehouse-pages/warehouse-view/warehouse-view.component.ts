import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Amenities } from '../../common-features/amenities';
import { CommunicationService } from '../../../_services/communication.service';
import { WarehouseService } from '../warehouse.service';
import { Warehouse } from '../../../_models/warehouse';
@Component({
	selector: 'app-warehouse-view',
	templateUrl: './warehouse-view.component.html',
	styleUrls: ['./warehouse-view.component.css']
})
export class WarehouseViewComponent implements OnInit {

	warehouseId: any;
	warehouseObj: Warehouse;
	amentities = Amenities;
	amentitiesArr: string[]=[];
	constructor(private route: ActivatedRoute, private _comm: CommunicationService, private _warehouseService:WarehouseService) { 
		this.route.params.subscribe(param => {
			if(param && param.id){
				this.warehouseId = param.id;
				this.getWarehouseDetail();
			}
		});
	}

	getWarehouseDetail(){
		this._comm.notifyShowHideLoader({ show: true });
		this._warehouseService.getWarehouseDetail(this.warehouseId).subscribe(data => {
			this._comm.notifyShowHideLoader({ show: false });
			if(data.body['amenities_facilities']){
				this.getAmenities(data.body['amenities_facilities']);
			}
			this.warehouseObj = JSON.parse(JSON.stringify(data.body));
			let lengthImage = this.warehouseObj.warehouse_images.length;
			if(lengthImage == 0){
				this.warehouseObj.warehouse_images[0] = {id: 1, image_file: "https://dummyimage.com/100x100/000/fff", is_favourite: false};
			}
		}, error=>{
			this._comm.notifyShowHideLoader({ show: false });
		});
	}

	getAmenities(amenities:any){
		console.log(amenities);
		for(let i = 0;i < amenities.length; i++){
			for(let j=0; j < this.amentities.length; j++){

				if(this.amentities[j].key == amenities[i].amenities_facilities ){
					this.amentitiesArr.push(this.amentities[j].value);
					console.log(this.amentities[j].value);
					break;
				}
			}
		}
	}
	ngOnInit(): void {
	}
}
