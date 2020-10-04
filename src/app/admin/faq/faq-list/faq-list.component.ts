import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../_services/alert.service'
import { CommunicationService } from 'src/app/_services/communication.service';
import { FaqService } from '../faq.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertMatDialogComponent } from '../../mat-components/mat-dialog/alert-mat-dialog.component';
import { MessageService } from '../../../_services/message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss']
})
export class FaqListComponent implements OnInit {
	
	pageIndex = 0;
	pageSize = 10;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	sortField = 'title,ASC';
	sortOrder = 'ASC';
	searchKey = '';
	filter = { duration: "ALL", search: '' };
	changeTimer: any;
	
	dataEmpty = true;
	dataList: any;
	dataSource = new MatTableDataSource();
	displayedColumns: string[] = ['title', 'action'];
	totalRecords: any;
	fetchedRecords = 1;
	dataArray:any=[];
	startPage = 0;
	endPage = 0;
	
	constructor(private faqService: FaqService, private _comm: CommunicationService, 
				private alertService: AlertService,public translate: TranslateService, public dialog: MatDialog, private _messageService: MessageService) { 			
	}

	ngOnInit(): void {
		this._messageService.changeMessage("FAQ's");
		setTimeout(() =>
			this.fetchFAQList()
		);
	}

	fetchFAQList(){
		const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey, page:this.pageIndex };
		this._comm.notifyShowHideLoader({ show: true });
		this.faqService.getFAQList(this.filter, postData).subscribe(data =>{
			this._comm.notifyShowHideLoader({ show: false });
			this.dataList = data.body['faqList'];
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
		this.fetchFAQList();
	}

	getPageSize(size) {
		if (size) {
			this.pageSize = size;
			this.pageIndex = 0;
			this.fetchFAQList();
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
					that.fetchFAQList();
				}, 100);
			}
		}
	
	}
	pageChanged(data: any) {
		this.pageIndex = data.pageIndex
		this.fetchFAQList();
	}

	deleteFAQ(id: any){
		this._comm.notifyShowHideLoader({ show: true });
		this.faqService.deleteFAQ(id).subscribe(res=>{
			this._comm.notifyShowHideLoader({ show: false });
			if(res['status'] == 200){
				this.alertService.success('success',this.translate.instant('errorMessage.faqDelete'));
				this.fetchFAQList();
			}
		},error=>{
			this._comm.notifyShowHideLoader({ show: false });
		});
	}

	openDialog(element: any) {
		const dialogRef = this.dialog.open(AlertMatDialogComponent, {
		  width: '500px',
		  data: { id: element.id, name: this.translate.instant('Common.thisClient'), title: element.title }
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result == element.id){
				this.deleteFAQ(element.id);
			}
		});
	}

}
