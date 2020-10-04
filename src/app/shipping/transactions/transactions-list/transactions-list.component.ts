import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '../../../_services/message.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../_services/date.adapter';
import { TranslateService } from '@ngx-translate/core';
import { transactionsService } from '../transactions.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class TransactionsListComponent implements OnInit {

  pageIndex = 0;
	pageSize = 10;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	sortField = 'txn_date,DESC';
	sortOrder = 'ASC';
	searchKey = '';
	filter = { duration: "ALL", search: '' };
	changeTimer: any;
	dataEmpty = true;
	dataList: any;
	dataSource = new MatTableDataSource();
	displayedColumns: string[] = ['code', 'txn_id', 'customer_name', 'commission_amount', 'amount','placedOn', 'action'];
	totalRecords: any;
	fetchedRecords = 1;
	startPage = 0;
	endPage = 0;
	fromDate: any = '';
	toDate: any = '';
	minDate: any = '';
	transForm: FormGroup;
	downloadButton:any = '';
	constructor(private _transactionsService: transactionsService,
	  private _comm: CommunicationService, private _messageService: MessageService,
	  public translate: TranslateService,
	  private fb: FormBuilder
	) { }
  
	ngOnInit(): void {
	  this._messageService.changeMessage('transaction');
	  this.formInIt();
	  setTimeout(() => {
		this.fetchOrderList();
	  });
	}
	formInIt() {
	  this.transForm = this.fb.group({
		toDate: ['', []],
	  });
	}
	fetchOrderList() {
	  const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey, page: this.pageIndex, from_to: this.fromDate, to_date: this.toDate };
	  this._comm.notifyShowHideLoader({ show: true });
	  this._transactionsService.getTransactionList(this.filter, postData).subscribe(data => {
		this._comm.notifyShowHideLoader({ show: false });
		this.dataList = data.body;
		var lengthData = data.headers.get('x-total-count');
		if (this.dataList.length > 0) {
		  this.dataEmpty = false;
		  this.dataSource.data = this.dataList;
		  this.totalRecords = lengthData;
		  this.fetchedRecords = this.totalRecords;
		  this.startPage = (this.pageIndex) * this.pageSize + 1;
		  this.endPage = ((this.pageIndex) * this.pageSize) + this.dataList.length;
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
	  this.fetchOrderList();
	}
  
	getPageSize(size) {
	  console.log("getPageSize(size)");
	  if (size) {
		this.pageSize = size;
		this.pageIndex = 0;
		this.fetchOrderList();
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
					that.fetchOrderList();
				}, 100);
			}
		}
	
	}
	pageChanged(data: any) {
	  this.pageIndex = data.pageIndex;
	  this.fetchOrderList();
	}
	getFromDate(selectDate, event) {
	  if (selectDate) {
		this.fromDate = selectDate;
		this.minDate = new Date(event.value);
		this.transForm.controls.toDate.setValue('');
		this.validateDate();
	  }else{
		this.fromDate = '';
		this.minDate = '';
		this.toDate ='';
	    this.downloadButton = false;
		this.validateDate();
	  }
	}
	getToDate(selectDate) {
	  if (selectDate) {
		this.downloadButton = true;
		this.toDate = selectDate;
		this.validateDate();
	  }else{
		this.downloadButton = false;
	  }
	}
	validateDate() {
	  if (this.toDate && this.fromDate) {
		this.fetchOrderList();
	  } else {
		 this.fetchOrderList(); }
	}
  
	transactionDownload()
	{
	  this._comm.notifyShowHideLoader({ show: true });
	  const postData = {from_to: this.fromDate, to_date: this.toDate };
	  this._transactionsService.getDownloadTransation(postData).subscribe({
		next: (response: any) => {
		  // var contentDisposition = response.headers.get('content-disposition');
		  // var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
		  // let fileName = 'file';
		  // if (contentDisposition) {
		  //   const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
		  //   const matches = fileNameRegex.exec(contentDisposition);
		  //   if (matches != null && matches[1]) {
		  //     fileName = matches[1].replace(/['"]/g, '');
		  //   }
		  // }
		  const fileContent = response.body;
		  FileSaver.saveAs(fileContent, `transactions.xlsx`);
		  this._comm.notifyShowHideLoader({ show: false });
		},
		error: (error) => {
		  this._comm.notifyShowHideLoader({ show: false });
		}
	  });
	}


}
