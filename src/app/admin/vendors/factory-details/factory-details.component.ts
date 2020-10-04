import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '../../../_services/message.service';
import { StarRatingComponent } from 'ng-starrating';
import { VendorsService } from '../vendors.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-factory-details',
  templateUrl: './factory-details.component.html',
  styleUrls: ['./factory-details.component.css']
})
export class FactoryDetailsComponent implements OnInit {
  dataEmpty = true;
	productList: any;
	data: [];
  dataList: any;
  factoryDetailsData :any;
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
	displayedColumns: string[] = ['image_file_thumb', 'name', 'sku','sale_count','price'];
	dataSource = new MatTableDataSource();
	startPage = 0;
  endPage = 0;
  factoryUser_id:any;
  factory_name:any;
	constructor(private _vendorsService:VendorsService, private _comm: CommunicationService, 
    private _alrt: AlertService, private router: Router, 
    public translate: TranslateService,
		private _auth: AuthenticationService,private _messageService: MessageService, private route: ActivatedRoute) {
    this.userDetails = this._auth.getLoginUserDetails();
    this.route.params.subscribe(params => {
      if (params && params.user_id) {
        setTimeout(() => {
          this.factoryUser_id = params.user_id;
          if (this.factoryUser_id) {
            this.fetchProductList()
          }
        })
      }
    });
	}

	ngOnInit(): void {
    this._messageService.changeMessage('vendors');
		this.productList = [];
	
	}

	fetchProductList() {
		const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey, page: this.pageIndex };
    const id = this.factoryUser_id;
    this._comm.notifyShowHideLoader({ show: true });
		this._vendorsService.getProductList(id, this.filter, postData).subscribe((data) => {
      this._comm.notifyShowHideLoader({ show: false });
	  this.dataList = data.body;
			if (this.dataList) {
				this.dataEmpty = false;
				this.factoryDetailsData = JSON.parse(JSON.stringify(this.dataList.factory_vendor));
				this.dataSource.data = this.dataList.product_list;
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
					that.fetchProductList();
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

}
