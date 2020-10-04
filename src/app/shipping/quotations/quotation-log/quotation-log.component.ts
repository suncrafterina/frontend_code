import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '../../../_services/message.service';
import { QuotationService } from '../quotations.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quotation-log',
  templateUrl: './quotation-log.component.html',
  styleUrls: ['./quotation-log.component.css']
})
export class QuotationLogComponent implements OnInit {
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
	totalRecords: any;
	fetchedRecords = 1;
	displayedColumns: string[] = ['date', "activity"];
	  orderId:any;
	  startPage = 0;
	endPage = 0;
  constructor(private _messageService: MessageService , public translate: TranslateService, private _comm: CommunicationService, 
    private _alrt: AlertService, private router: Router, private route: ActivatedRoute, private _quotationService:QuotationService) { }
	ngOnInit(): void {
    this._messageService.changeMessage('quotation');
    this.route.params.subscribe(param=>{
      if(param && param.id){
       this.orderId = param.id;
      }else{
      }
    });
			this.fetchQuotationList()
		
	}
	fetchQuotationList(){
		this._comm.notifyShowHideLoader({ show: true });
		this._quotationService.getOrderLog(this.orderId).subscribe(data =>{
    		this._comm.notifyShowHideLoader({ show: false });
			this.dataList = data;
		//	var lengthData = data.headers.get('x-total-count');
			if (this.dataList.length) {
				this.dataSource.data = this.dataList;
			} else {
				this.dataSource.data = this.dataList;
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
