import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorsService } from '../vendors.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CommissionMatDialogComponent } from '../commission-mat-dialog/commission-mat-dialog.component';
import { MessageService } from 'src/app/_services/message.service';
import { TranslateService } from '@ngx-translate/core';
 
@Component({
	selector: 'app-factory-list',
	templateUrl: './factory-list.component.html',
	styleUrls: ['./factory-list.component.css']
})
export class FactoryListComponent implements OnInit {
	dataEmpty = true;
	categoryList: any;
	data: [];
	dataList: any;
	itemSettings = ['View', 'Edit'];
	pageIndex = 0;
	sortField = 'first_name,asc';
	sortOrder = 'asc';
	pageSize = 10;
	totalRecords: any;
	searchKey = '';
	changeTimer: any;
	filter = { duration: "ALL", search: '' };
	pageSizeOptions: number[] = [5, 10, 25, 100];
	fetchedRecords = 1;
	fieldsArr = { 'Category Title': 'first_name' };
	sortMenu = Object.keys(this.fieldsArr);
	userDetails: any;
	startPage = 0;
	endPage = 0;
	displayedColumns: string[] = ['name', 'email', 'phone_number', 'transactions', 'registered_on', 'status', 'commission'];
	//displayedColumns: string[] = ['image', 'sorting_product_name', 'sorting_sku', 'sorting_category', 'sorting_manufacturer',  'sorting_addon', 'sorting_price', 'action'];
	dataSource = new MatTableDataSource();
	shipperList: any;

	constructor(public dialog: MatDialog,public translate: TranslateService, private _messageService: MessageService, private vendorsService: VendorsService, private _comm: CommunicationService, private _alrt: AlertService, private router: Router, private _auth: AuthenticationService) {
		this.userDetails = this._auth.getLoginUserDetails();
	}

	ngOnInit(): void {
		this._messageService.changeMessage('vendors');
		setTimeout(() =>
			this.fetchCategoryList()
		);
	}

	/**
	Fetch Address List 
	**/
	fetchCategoryList() {
		const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey, page: this.pageIndex };
		this._comm.notifyShowHideLoader({ show: true });
		this.vendorsService.getFactoryList(this.filter, postData).subscribe((data) => {
			this._comm.notifyShowHideLoader({ show: false });
			this.dataList = data.body;
			// this.dataList = this.shipperList.shipperList;
			if (this.dataList.length) {
				this.dataEmpty = false;
				this.dataSource.data = this.dataList;
				this.totalRecords = data.headers.get('x-total-count');
				this.fetchedRecords = this.totalRecords;
				this.startPage = (this.pageIndex) * this.pageSize + 1;
				this.endPage = ((this.pageIndex) * this.pageSize) + this.dataList.length;
			} else {
				this.dataEmpty = true;
				this.dataSource.data = [];
			}
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
		})
	}

	// search function
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
					that.fetchCategoryList();
				}, 100);
			}
		}
	}
	// end of search function
	//Item Setting
	itemSettingsFunction(val, item) {
		switch (val) {
			case 'Edit':
				this.router.navigate(['/admin/category/edit', item['categoryId']]);
				break;
			case 'View':
				this.router.navigate(['/admin/category/view', item['categoryId']]);
				break;
		}
	}
	// sort
	getSortData(data) {
		console.log(data);
		if (data.direction !== undefined) {
			this.sortOrder = data.direction;
		}
		this.sortField = data.active + ',' + this.sortOrder;
		this.pageIndex = 0;
		this.fetchCategoryList();
	}

	getPeriod(period) {
		this.filter.duration = (period) ? period : null;
		this.pageIndex = 0;
		this.fetchCategoryList();
	}
	getPageSize(size) {
		if (size) {
			this.pageSize = size;
			this.pageIndex = 0;
			this.fetchCategoryList();
		}

	}
	pageChanged(data) {
		this.pageIndex = data.pageIndex
		this.fetchCategoryList();
	}

	onValChange(event, data) {
		const postData = event.checked
		let id = data.user_id;
		this._comm.notifyShowHideLoader({ show: true });
		this.vendorsService.getFactoryStatus(id, postData).subscribe((data) => {
			this.fetchCategoryList();
			this._comm.notifyShowHideLoader({ show: false });
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
		})
	}

}
