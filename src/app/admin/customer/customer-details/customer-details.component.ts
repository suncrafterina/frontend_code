import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/_services/communication.service';
import { CustomerService } from '../customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '../../../_services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  sortField = 'created_at,DESC';
  sortOrder = 'ASC';
  searchKey = '';
  filter = { duration: "ALL", search: '' };
  changeTimer: any;
  dataEmpty = true;
  dataList: any;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] =  ['code','created_at', 'orderStatus','total_amount','action'];
  totalRecords: any;
  fetchedRecords = 1;
  customerId = '';
  customerDetails:any =[];
  startPage = 0;
	endPage = 0;
  constructor(private _customer: CustomerService,private router: Router,private route: ActivatedRoute, private _comm: CommunicationService, private _messageService: MessageService) { 
    
  }

  ngOnInit(): void {
    this._messageService.changeMessage("customer");
    this.route.params.subscribe(param =>{
			if(param){
        this.customerId = param.id;
        console.log("xcxc");
				this.fetchOrderList();
				this.fetchOrderDetails();
			}
		});
  }
  fetchOrderDetails() {
    if (this.customerId) {
      this._comm.notifyShowHideLoader({ show: true });
      this._customer.getorderDetails(this.customerId).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        if (res) {
          var resp = res;
          this.customerDetails =  resp;
          console.log(this.customerDetails,"zxzx");
        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
      });
    }
  }
  
  fetchOrderList() {
    const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey, page: this.pageIndex };
    this._comm.notifyShowHideLoader({ show: true });
    this._customer.getorderList(this.filter, postData,this.customerId).subscribe(data => {
      if(data)
      {
        this._comm.notifyShowHideLoader({ show: false });
      }
      this.dataList = data.body;
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
    console.log("getSortData(data)");
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
    if ((searchCount > 3) || (searchCount == 0)) {
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


}
