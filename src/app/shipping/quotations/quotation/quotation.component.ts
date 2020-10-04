import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '../../../_services/message.service';
import { QuotationService } from '../quotations.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {

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
	displayedColumns: string[] = ['orderID', "transactionID",'email_address', 'placedOn','amount','shippingStatus', 'requestStatus', 'action'];
	totalRecords: any;
	fetchedRecords = 1;

	constructor(public translate: TranslateService, public _quotationService:QuotationService, private _comm: CommunicationService, private alert: AlertService, private _messageService: MessageService) { }

	ngOnInit(): void {
		this._messageService.changeMessage('quotation');
			this.fetchQuotationList()
		
	}

	

	fetchQuotationList(){
		const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey, page:this.pageIndex };
		this._comm.notifyShowHideLoader({ show: true });
		this._quotationService.getQuotationList(this.filter, postData).subscribe(data =>{
    		this._comm.notifyShowHideLoader({ show: false });
			this.dataList = data.body;
			var lengthData = data.headers.get('x-total-count');
			if (this.dataList.length) {
				this.dataEmpty = false;
				this.dataSource.data = this.dataList;
				this.totalRecords = lengthData;
				this.fetchedRecords = this.totalRecords;
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
		this.fetchQuotationList();
	}

	getPageSize(size: any) {
		if (size) {
			this.pageSize = size;
			this.pageIndex = 0;
			this.fetchQuotationList();
		}
	}

	searchFunction(val: any) {
		if (typeof val != 'object') {
			clearTimeout(this.changeTimer);
			var that = this;
			that.changeTimer = setTimeout(function () {
				that.searchKey = (val) ? val.trim() : '';
				that.filter.search = that.searchKey;
				that.pageIndex = 0;
				that.fetchQuotationList();
			}, 100);
		}
	}
	pageChanged(data: any) {
		this.pageIndex = data.pageIndex
		this.fetchQuotationList();
	}


}
