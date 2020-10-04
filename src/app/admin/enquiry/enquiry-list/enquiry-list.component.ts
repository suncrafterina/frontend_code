import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/_services/communication.service';
import { EnquiryService } from '../enquiry.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '../../../_services/message.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
	selector: 'app-enquiry-list',
	templateUrl: './enquiry-list.component.html',
	styleUrls: ['./enquiry-list.component.css']
})
export class EnquiryListComponent implements OnInit {
	
	pageIndex = 0;
	pageSize = 10;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	sortField = 'created_at,DESC';
	sortOrder = 'ASC';
	searchKey = '';
	filter = { duration: "ALL", search: '' };
	changeTimer: any;
	
	dataEmpty = true;
	dataList: any;
	dataSource = new MatTableDataSource();
	displayedColumns: string[] = ['name', 'email', 'subject', 'created_at', 'action'];
	totalRecords: any;
	fetchedRecords = 1;
	startPage = 0;
	endPage = 0;
	constructor(private enquiryService: EnquiryService,public translate: TranslateService, private _comm: CommunicationService, private _messageService: MessageService) { }

	ngOnInit(): void {
		this._messageService.changeMessage('enquiry');
		setTimeout(() =>
			this.fetchEnquiryList()
		);
	}

	fetchEnquiryList(){
		const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey, page:this.pageIndex };
		this._comm.notifyShowHideLoader({ show: true });
		this.enquiryService.getEnquiryList(this.filter, postData).subscribe(data =>{
			this._comm.notifyShowHideLoader({ show: false });
			this.dataList = data.body;
			var lengthData = data.headers.get('x-total-count');
			if (this.dataList.length > 0) {
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
	getSortData(data) {
		if (data.direction !== undefined) {
			this.sortOrder = data.direction;
		}
		this.sortField = data.active + ',' + this.sortOrder;
		this.pageIndex = 0;
		this.fetchEnquiryList();
	}

	getPageSize(size) {
		if (size) {
			this.pageSize = size;
			this.pageIndex = 0;
			this.fetchEnquiryList();
		}
	}

	searchFunction(val) {
		let searchCount = 0;
		searchCount = val.trim().length;
		if ((searchCount > 3) || (searchCount == 0)) {
			if (typeof val != 'object') {
				clearTimeout(this.changeTimer);
				var that = this;
				that.changeTimer = setTimeout(function () {
					that.searchKey = (val) ? val.trim() : '';
					that.filter.search = that.searchKey;
					that.pageIndex = 0;
					that.fetchEnquiryList();
				}, 100);
			}
		}
	
	}
	pageChanged(data: any) {
		console.log("pageChanged(data: any)");
		console.log(data);
		this.pageIndex = data.pageIndex;
		this.fetchEnquiryList();
	}
}
