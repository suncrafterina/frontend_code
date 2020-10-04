import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '../../../_services/message.service';
import {  ProposalsService } from '../proposals.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-proposals-list',
  templateUrl: './proposals-list.component.html',
  styleUrls: ['./proposals-list.component.css']
})
export class ProposalsListComponent implements OnInit {

    pageIndex = 0;
	pageSize = 10;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	sortField = 'o.code,ASC';
	sortOrder = 'ASC';
	searchKey = '';
	filter = { duration: "ALL", search: '' };
	changeTimer: any;
	
	dataEmpty = true;
	dataList: any;
	dataSource = new MatTableDataSource();
	displayedColumns: string[] = ['orderID', "transactionID",'email_address', 'placedOn','warehouseName','amount', 'status', 'action'];
	totalRecords: any;
	fetchedRecords = 1;
	startPage = 0;
	endPage = 0;
	constructor(public _proposalsService:ProposalsService,public translate: TranslateService, private _comm: CommunicationService, private alert: AlertService, private _messageService: MessageService) { }

	ngOnInit(): void {
		this._messageService.changeMessage('Proposals');
			this.fetchProposalsList()
		
	}

	

	fetchProposalsList(){
		const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey, page:this.pageIndex };
		this._comm.notifyShowHideLoader({ show: true });
		this._proposalsService.getProposalsList(this.filter, postData).subscribe(data =>{
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
		this.fetchProposalsList();
	}

	getPageSize(size: any) {
		if (size) {
			this.pageSize = size;
			this.pageIndex = 0;
			this.fetchProposalsList();
		}
	}

	searchFunction(val: any) {
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
					that.fetchProposalsList();
				}, 100);
			}
		}
		
	}
	pageChanged(data: any) {
		this.pageIndex = data.pageIndex
		this.fetchProposalsList();
	}

}
