import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/_services/message.service';
import { RequestsService } from '../requests.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit {

	pageIndex = 0;
	pageSize = 10;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	sortField = 'request_by,ASC';
	sortOrder = 'ASC';
	searchKey = '';
	filter = { duration: "ALL", search: '' };
	changeTimer: any;
	
	dataEmpty = true;
	dataList: any;
	dataSource = new MatTableDataSource();
	displayedColumns: string[] = ['request_for', 'entity_title', 'values', 'request_by','action'];
	totalRecords: any;
	fetchedRecords = 1;
	startPage = 0;
	endPage = 0;
	constructor(private _requestsService: RequestsService,public translate: TranslateService, private _comm: CommunicationService, private _alrt: AlertService, private _messageService: MessageService) { }

	ngOnInit(): void {
		this._messageService.changeMessage('request');
		setTimeout(() =>
			this.fetchRequestList()
		);
	}

	

	fetchRequestList(){
		const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey, page:this.pageIndex };
		this._comm.notifyShowHideLoader({ show: true });
		this._requestsService.getRequestsList(this.filter, postData).subscribe(data =>{
    		this._comm.notifyShowHideLoader({ show: false });
			this.dataList = data.body;
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
		this.fetchRequestList();
	}

	getPageSize(size: any) {
		if (size) {
			this.pageSize = size;
			this.pageIndex = 0;
			this.fetchRequestList();
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
				that.fetchRequestList();
			}, 100);
		}
	}
	pageChanged(data: any) {
		this.pageIndex = data.pageIndex
		this.fetchRequestList();
	}
	acceptRequest(data){
		const dtID = ''
		this._comm.notifyShowHideLoader({ show: true });
		this._requestsService.getAcceptRequests(data.id, dtID).subscribe(res => {
			this._comm.notifyShowHideLoader({ show: false });
			this.fetchRequestList();
			const msg = (res && res['message']) ? res['message'] : 'Category updated successfully';
			this._alrt.success('Success', msg);
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
			const msg = (error &&  error['error_description']) ? error['error_description'] : 'Error occured during category creation.';
  
			this._alrt.error('Error', msg);
		});
	}
	declinedRequest(data){
		const dtID = ''
		this._comm.notifyShowHideLoader({ show: true });
		this._requestsService.getDeclinedRequests(data.id, dtID).subscribe(res => {
			this._comm.notifyShowHideLoader({ show: false });
			this.fetchRequestList();
			const msg = (res && res['message']) ? res['message'] : 'Category updated successfully';
			this._alrt.success('Success', msg);
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
			const msg = (error &&  error['error_description']) ? error['error_description'] : 'Error occured during category creation.';
  
			this._alrt.error('Error', msg);
		});
	}
}
