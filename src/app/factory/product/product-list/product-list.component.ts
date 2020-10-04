import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '../../../_services/message.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
	dataEmpty = true;
	productList: any;
	data: [];
	dataList: any;
	itemSettings = ['View', 'Edit'];
	pageIndex = 0;
	sortField = 'name,ASC';
	sortOrder = 'ASC';
	pageSize = 10;
	totalRecords: any;
	searchKey = '';
	changeTimer: any;
	filter = { duration: "ALL", search: '' };
	pageSizeOptions: number[] = [5, 10, 25, 100];
	fetchedRecords = 1;
	fieldsArr = { 'Product Title': 'title' };
	sortMenu = Object.keys(this.fieldsArr);
	userDetails: any;
	showListType = 0;
	displayedColumns: string[] = ['image_file_thumb', 'name', 'sku','category','manufacturer','added_on','price','vendor_show_status','action'];
	startPage = 0;
	endPage = 0;
	//displayedColumns: string[] = ['image_file_thumb', 'name', 'sku', 'category','manufacturer','added_on','price','action'];
	//displayedColumns: string[] = ['image', 'sorting_product_name', 'sorting_sku', 'sorting_category', 'sorting_manufacturer',  'sorting_addon', 'sorting_price', 'action'];
	dataSource = new MatTableDataSource();

	constructor(private _product: ProductService, private _comm: CommunicationService, 
		private _alrt: AlertService, private router: Router, 
		private _auth: AuthenticationService,private _messageService: MessageService,
		public translate: TranslateService
		) {
		this.userDetails = this._auth.getLoginUserDetails();
	}

	ngOnInit(): void {
		this._messageService.changeMessage('productManagement');
		this.productList = [];
		setTimeout(() =>
			this.fetchProductList()
		);
	}

	fetchProductList() {
		const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey, page: this.pageIndex };
		this._comm.notifyShowHideLoader({ show: true });
		this._product.getProductList(this.filter, postData).subscribe((data) => {
			this._comm.notifyShowHideLoader({ show: false });
			this.dataList = data.body;
			if (this.dataList) {
				this.dataEmpty = false;
				this.dataSource.data = this.dataList;
				this.totalRecords = data.headers.get('x-total-count');
				this.fetchedRecords = this.totalRecords;
				this.startPage = (this.pageIndex) * this.pageSize + 1;
				this.endPage =  ((this.pageIndex) * this.pageSize) + this.dataList.length;
			} else {
				this.dataEmpty = true;
			}
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
		})
	}
	// search function
	searchFunction(val) {
		if (typeof val != 'object') {
			clearTimeout(this.changeTimer);
			var that = this;
			that.changeTimer = setTimeout(function () {
				that.searchKey = (val) ? val.trim() : '';
				that.filter.search = that.searchKey;
				that.pageIndex = 0;
				that.fetchProductList();
			}, 100);
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
		if (data.direction !== undefined) {
			this.sortOrder = data.direction;
		}
		this.sortField = data.active + ',' + this.sortOrder;
		this.pageIndex = 0;
		this.fetchProductList();
	}

	getPeriod(period) {
		this.filter.duration = (period) ? period : null;
		this.pageIndex = 0;
		this.fetchProductList();
	}
	getPageSize(size) {
		if (size) {
			this.pageSize = size;
			this.pageIndex = 0;
			this.fetchProductList();
		}

	}
	pageChanged(data) {
		this.pageIndex = data.pageIndex
		this.fetchProductList();
	}
	showType(type)
	{
		this.showListType = type;
	}
	onValChange(event, data){
		const postData = event.checked
		let id = data.id;
		this._comm.notifyShowHideLoader({ show: true });
		this._product.getProductStatus(id,postData,id).subscribe((data) => {
		this.fetchProductList();
		this._comm.notifyShowHideLoader({ show: false });
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
		})
	}


}
