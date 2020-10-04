import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorsService } from '../vendors.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/_services/message.service';
import { AnyARecord } from 'dns';
import { Amenities } from '../../../warehouse/common-features/amenities';
import { TranslateService } from '@ngx-translate/core';
 
@Component({
	selector: 'app-warehouse-details',
	templateUrl: './warehouse-details.component.html',
	styleUrls: ['./warehouse-details.component.css']
})
export class WarehouseDetailsComponent implements OnInit {
	warehouseId: any;
	warehouseObj: any;
	amentities = Amenities;
	amentitiesArr: string[] = [];

	constructor(private _messageService: MessageService,public translate: TranslateService, private vendorsService: VendorsService, private _comm: CommunicationService, private _alrt: AlertService, private router: Router, private route: ActivatedRoute, private _auth: AuthenticationService) {
		this.route.params.subscribe(params => {
			if (params) {
				this.warehouseId = params.id;
			}
		});
	}

	ngOnInit(): void {
		this._messageService.changeMessage('vendors');
		this.getWarehouseDetail();

	}
	// fetchCategoryList() {
	//   const id= this.user_id;
	// 	this._comm.notifyShowHideLoader({ show: true });
	// 	this.vendorsService.getWarehouseDetails(id).subscribe((data) => {
	// 	this._comm.notifyShowHideLoader({ show: false });

	// 	}, error => {
	// 		this._comm.notifyShowHideLoader({ show: false });
	// 	})
	// }


	getWarehouseDetail() {
		this._comm.notifyShowHideLoader({ show: true });
		this.vendorsService.getWarehouseDetails(this.warehouseId).subscribe(data => {
			this._comm.notifyShowHideLoader({ show: false });
			if(data){
			if(data.body['amenities_facilities']){
				this.getAmenities(data.body['amenities_facilities']);
			}
			this.warehouseObj = JSON.parse(JSON.stringify(data.body));
			let lengthImage = this.warehouseObj.image_file.length;
			if (lengthImage == 0) {
				this.warehouseObj.image_file[0] = { id: 1, image_file: "https://dummyimage.com/100x100/000/fff", is_favourite: false };
			}
		}
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
		});
	}

	getAmenities(amenities: any) {
		for (let i = 0; i < amenities.length; i++) {
			for (let j = 0; j < this.amentities.length; j++) {
				if (this.amentities[j].key == amenities[i]) {
					this.amentitiesArr.push(this.amentities[j].value);
					break;
				}
			}
		}
	}
}
