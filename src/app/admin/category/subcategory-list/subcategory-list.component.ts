import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
	selector: 'app-subcategory-list',
	templateUrl: './subcategory-list.component.html',
	styleUrls: ['./subcategory-list.component.scss']
})
export class SubcategoryListComponent implements OnInit {
	dataEmpty = true;
	categoryList: any;
	data: [];
	dataList: any;
	itemSettings = ['View', 'Edit'];
	pageIndex = 0;
	sortField = 'title,ASC';
	sortOrder = 'ASC';
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
	categoryId: any;
	subcategoryId: any;
	pageTitle: any;
	displayedColumns: string[] = ['title', 'attribute_count', 'option_count', 'sorting_order', 'subacateory_count', 'action'];
	dataSource = new MatTableDataSource();
	config: any;
	collection = { count: 60, data: [] };
	startPage = 0;
	endPage = 0;
	constructor(private _category: CategoryService, private _comm: CommunicationService, private _alrt: AlertService, private router: Router, private _auth: AuthenticationService, private route: ActivatedRoute) {
		this.userDetails = this._auth.getLoginUserDetails();
		this.config = {
			itemsPerPage: 5,
			currentPage: 1,
			totalItems: this.collection.count
		};
	}


	ngOnInit(): void {
		this.categoryList = [];
		this.route.params.subscribe(params => {
			if (params && params.cat) {
				this.categoryId = params.cat;
				this.subcategoryId = params.id;
				this.getCategoryDetails();
				setTimeout(() =>
					this.fetchCategoryList()
				);
			}
		});

	}
	fetchCategoryList() {
		const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey };
		this._comm.notifyShowHideLoader({ show: true });
		this._category.getsubcategoryList(this.filter, postData, this.categoryId).subscribe((data) => {
			this._comm.notifyShowHideLoader({ show: false });
			this.dataList = data.body;
			if (this.dataList.length) {
				this.dataEmpty = false;
				this.dataSource.data = this.dataList;
				this.totalRecords = data.headers.get('x-total-count');
				this.fetchedRecords = this.totalRecords;
				this.startPage = (this.pageIndex) * this.pageSize + 1;
				this.endPage = ((this.pageIndex) * this.pageSize) + this.dataList.length;
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
	getCategoryDetails() {
		if (this.categoryId) {
			this._category.getCategoryDetails(this.categoryId).subscribe(res => {
				if (res) {
					this.pageTitle = res['title'];
				}
			});
		}
	}
	pageChanged(data) {
		console.log(data);
		this.pageIndex = data.pageIndex
		this.fetchCategoryList();
	}




}
