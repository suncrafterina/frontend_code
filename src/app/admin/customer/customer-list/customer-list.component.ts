import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/_services/communication.service';
import { CustomerService } from '../customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '../../../_services/message.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  pageIndex = 0;
	pageSize = 10;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	sortField = 'user.createdDate,DESC';
	sortOrder = 'ASC';
	searchKey = '';
	filter = { duration: "ALL", search: '' };
	changeTimer: any;
	dataEmpty = true;
	dataList: any;
	dataList1: any;
	dataSource = new MatTableDataSource();
	displayedColumns: string[] = ['customer_name','email', 'phone_number','registrationOn','status'];
	totalRecords: any;
	fetchedRecords = 1;
	startPage = 0;
	endPage = 0;
	constructor(private _customer: CustomerService, 
		private _comm: CommunicationService, private _messageService: MessageService,
		public translate: TranslateService
		) { }

	ngOnInit(): void {
		this._messageService.changeMessage('customer');
		setTimeout(() =>
			this.fetchCustomerList()
		);
  }
  
	fetchCustomerList(){
		const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey, page:this.pageIndex };
		this._comm.notifyShowHideLoader({ show: true });
		this._customer.getCustomerList(this.filter, postData).subscribe(data =>{
			this._comm.notifyShowHideLoader({ show: false });
			this.dataList1 = data.body;
			this.dataList = this.dataList1.custList;
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
		this.fetchCustomerList();
	}

	getPageSize(size) {
		if (size) {
			this.pageSize = size;
			this.pageIndex = 0;
			this.fetchCustomerList();
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
					that.fetchCustomerList();
				}, 100);
			}
		}
	}
	pageChanged(data: any) {
		this.pageIndex = data.pageIndex;
		this.fetchCustomerList();
	}

	onValChange(event, data){
		const postData = event.checked;
		let id = data.id;
		this._comm.notifyShowHideLoader({ show: true });
		this._customer.getCustomerStatus(id, postData).subscribe((data) => {
		this.fetchCustomerList();
		this._comm.notifyShowHideLoader({ show: false });
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
		})
	}

}
