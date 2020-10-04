import { Component, OnInit } from '@angular/core';
import { VendorsService } from '../vendors.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
 	 dataEmpty = true;
	categoryList: any;
	data: [];
	dataList: any=[];
	itemSettings = ['View', 'Edit'];
	pageIndex = 0;
	sortField = 'cityname,asc';
	sortOrder = 'asc';
	pageSize = 10;
	totalRecords: any;
	searchKey = '';
	changeTimer: any;
	filter = { duration: "ALL", search: '' };
	pageSizeOptions: number[] = [5, 10, 25, 100];
	fetchedRecords = 1;
	fieldsArr = { 'Category Title': 'title' };
	sortMenu = Object.keys(this.fieldsArr);
	userDetails: any;
	startPage = 0;
	endPage = 0;
	displayedColumns: string[] = ['city', 'state', 'zip_code', 'country'];
	//displayedColumns: string[] = ['image', 'sorting_product_name', 'sorting_sku', 'sorting_category', 'sorting_manufacturer',  'sorting_addon', 'sorting_price', 'action'];
	dataSource = new MatTableDataSource();
  user_id: any;
  locData: any=[];
  city :any=[];
  state:any = [];
  country:any = [];
  zip_code:any = [];
	constructor(private vendorsService: VendorsService, private _comm: CommunicationService, private _alrt: AlertService, private router: Router, private route: ActivatedRoute, private _auth: AuthenticationService) {
    this.userDetails = this._auth.getLoginUserDetails();
    this.route.params.subscribe(params => {
      if (params && params.id) {
        setTimeout(() => {
          this.user_id = params.id;
        })
      }
    });
	}

	ngOnInit(): void {
		setTimeout(() =>
			this.fetchCategoryList()
		);
	}

	/**
	Fetch Address List 
	**/
	fetchCategoryList() {
		const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey,page:this.pageIndex };
    this._comm.notifyShowHideLoader({ show: true });
		this.vendorsService.getShipperLocationList(postData, this.user_id, this.filter).subscribe((data) => {
		this._comm.notifyShowHideLoader({ show: false });
      	this.dataList = data.body;
      // this.dataList.locList.forEach(element => {
      //   this.city.push(element.city.name);
      //   this.state.push(element.city.state.name);
      //   this.country.push(element.city.state.country.name);
      //   this.zip_code.push(element.zip_code);
      // });
			if (this.dataList.locList.length) {
				this.dataEmpty = false;
				this.dataSource.data = this.dataList.locList;
				this.totalRecords = data.headers.get('x-total-count');
				this.fetchedRecords = this.totalRecords;
				this.startPage = (this.pageIndex) * this.pageSize + 1;
				this.endPage =  ((this.pageIndex) * this.pageSize) + this.dataList.length;
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

}
