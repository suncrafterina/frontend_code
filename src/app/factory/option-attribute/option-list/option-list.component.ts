import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../_services/alert.service'
import { CommunicationService } from 'src/app/_services/communication.service';
import { OptionService } from '../option.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '../../../_services/message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css']
})
export class OptionListComponent implements OnInit {
	
	pageIndex = 0;
	pageSize = 10;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	sortField = 'entity_title,ASC';
	sortOrder = 'ASC';
	searchKey = '';
	filter = { duration: "ALL", search: '' };
	changeTimer: any;
	
	dataEmpty = true;
	dataList: any;
	dataSource = new MatTableDataSource();
	displayedColumns: string[] = [ 'request_for', 'entity_title', 'values','status'];
	totalRecords: any;
	fetchedRecords = 1;
	startPage = 0;
	endPage = 0;
	statusObject = {
		'ACCEPTED': 'Accepted',
		'DECLINED': 'Declined',
		'PENDING': 'Pending'
	};
	requestObject = {
		'ATTRIBUTE': 'Attribute',
		'OPTION': 'Option'
	};

	constructor(private optionService: OptionService, private _comm: CommunicationService, 
				private alertService: AlertService, private _messageService: MessageService,
				private translate:TranslateService
				) { 			
	}

	ngOnInit(): void {
		this._messageService.changeMessage('OptionsAndAttributes');
		setTimeout(() =>
			this.fetchOptionsList()
		);
	}

	fetchOptionsList(){
		const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey, page:this.pageIndex };
		this._comm.notifyShowHideLoader({ show: true });
		this.optionService.getOptionsList(this.filter, postData).subscribe(data =>{
			this._comm.notifyShowHideLoader({ show: false });
			this.dataList = data.body;
			var lengthData = data.headers.get('x-total-count');
			if (this.dataList.length > 0) {
				// #F68B23 Pending
				// #4DA466 Accepted
				// #F95C5D Declined
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
			const msg = (error && error['error'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.errorInFetchingAttributesAndOptions');
        	this.alertService.error('Error', msg);
		});
	}

	// sort
	getSortData(data) {
		if (data.direction !== undefined) {
			this.sortOrder = data.direction;
		}
		this.sortField = data.active + ',' + this.sortOrder;
		this.pageIndex = 0;
		this.fetchOptionsList();
	}

	getPageSize(size) {
		if (size) {
			this.pageSize = size;
			this.pageIndex = 0;
			this.fetchOptionsList();
		}
	}

	searchFunction(val) {
		let searchCount = 0;
		searchCount = val.trim().length;
		if (searchCount > 3) {
			if (typeof val != 'object') {
				clearTimeout(this.changeTimer);
				var that = this;
				that.changeTimer = setTimeout(function () {
					that.searchKey = (val) ? val.trim() : '';
					that.filter.search = that.searchKey;
					that.pageIndex = 0;
					that.fetchOptionsList();
				}, 100);
			}
		}
	
	}

	pageChanged(data: any) {
		this.pageIndex = data.pageIndex
		this.fetchOptionsList();
    }
  
}
