import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { WarehouseService } from '../warehouse.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '../../../_services/message.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {
	
	pageIndex = 0;
	pageSize = 10;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	sortField = 'name,ASC';
	sortOrder = 'ASC';
	searchKey = '';
	filter = { duration: "ALL", search: '' };
	changeTimer: any;
	
	dataEmpty = true;
	dataList: any;
	dataSource = new MatTableDataSource();
	displayedColumns: string[] = ['name', 'email_address', 'phone_number', 'status', 'action'];
	totalRecords: any;
	fetchedRecords = 1;
	startPage = 0;
	endPage = 0;
	
	constructor(private warehouseService: WarehouseService,public translate: TranslateService,private _comm: CommunicationService, private alert: AlertService, private _messageService: MessageService) { }

	ngOnInit(): void {
		this._messageService.changeMessage('warehouse');
		setTimeout(() =>
			this.fetchWarehouseList()
		);
	}

	onChangeToggle(event: any, id: any){
		this._comm.notifyShowHideLoader({ show:true });
		this.warehouseService.toggleWarehouse(id, event.checked).subscribe(data =>{
			this._comm.notifyShowHideLoader({ show: false });
			if(data['body']['status'] == 200){
				const msg = (data && data['body']['message']) ? data['body']['message'] :this.translate.instant('errorMessage.warehouseStatus');
			    this.alert.success('Success', msg);
			}
		},error=>{
			this._comm.notifyShowHideLoader({ show: false });
			const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] :this.translate.instant('errorMessage.warehouseErr');
			this.alert.error('Error', msg);
		});
	}

	fetchWarehouseList(){
		const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey, page:this.pageIndex };
		this._comm.notifyShowHideLoader({ show: true });
		this.warehouseService.getWarehouseList(this.filter, postData).subscribe(data =>{
    		this._comm.notifyShowHideLoader({ show: false });
			this.dataList = data.body['warList'];
			var lengthData = data.headers.get('x-total-count');
			if (this.dataList.length) {
				this.dataEmpty = false;
				this.dataSource.data = this.dataList;
				this.totalRecords = lengthData;
				this.fetchedRecords = this.totalRecords;
				this.startPage = (this.pageIndex) * this.pageSize + 1;
				this.endPage =  ((this.pageIndex) * this.pageSize) + this.dataList.length;
			} else {
				this.dataEmpty = true;
				this.dataSource.data = this.dataList;
				this.totalRecords = lengthData;
				this.fetchedRecords = this.totalRecords;
			}
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
		});
	}

	// sort
	getSortData(data: any) {
		if (data.direction !== undefined) {
			this.sortOrder = data.direction;
		}
		this.sortField = data.active + ',' + this.sortOrder;
		this.pageIndex = 0;
		this.fetchWarehouseList();
	}

	getPageSize(size: any) {
		if (size) {
			this.pageSize = size;
			this.pageIndex = 0;
			this.fetchWarehouseList();
		}
	}

	searchFunction(val: any) {
		if (typeof val != 'object') {
			clearTimeout(this.changeTimer);
			var that = this;
			that.changeTimer = setTimeout(function () {
				that.searchKey = (val) ? val.trim() : '';
				that.filter.search = that.searchKey;
				that.pageIndex = 0;
				that.fetchWarehouseList();
			}, 100);
		}
	}
	pageChanged(data: any) {
		this.pageIndex = data.pageIndex
		this.fetchWarehouseList();
	}
}

