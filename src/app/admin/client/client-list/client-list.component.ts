import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../_services/alert.service'
import { CommunicationService } from 'src/app/_services/communication.service';
import { ClientService } from '../client.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertMatDialogComponent } from '../../mat-components/mat-dialog/alert-mat-dialog.component';
import { MessageService } from '../../../_services/message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-client-list',
	templateUrl: './client-list.component.html',
	styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

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
	displayedColumns: string[] = ['image_ur_thumb', 'title', 'created_at', 'is_active', 'action'];
	totalRecords: any;
	fetchedRecords = 1;
	dataArray: any = [];
	startPage = 0;
	endPage = 0;
	constructor(private _client: ClientService, private _comm: CommunicationService,
		private alertService: AlertService, public translate: TranslateService, public dialog: MatDialog, private _messageService: MessageService) {
	}

	ngOnInit(): void {
		this._messageService.changeMessage('client');
		setTimeout(() =>
			this.fetchList()
		);
	}
	fetchList() {
		const postData = { pageIndex: this.pageIndex, sortField: this.sortField, sortOrder: this.sortOrder, pageSize: this.pageSize, search: this.searchKey, page: this.pageIndex };
		this._comm.notifyShowHideLoader({ show: true });
		this._client.getClientList(this.filter, postData).subscribe(data => {
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
		this.fetchList();
	}

	getPageSize(size) {
		if (size) {
			this.pageSize = size;
			this.pageIndex = 0;
			this.fetchList();
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
					that.fetchList();
				}, 100);
			}
		}

	}
	pageChanged(data: any) {
		this.pageIndex = data.pageIndex
		this.fetchList();
	}
	onValChange(event, data) {
		const postData = event.checked
		let id = data.id;
		this._comm.notifyShowHideLoader({ show: true });
		this._client.getClientStatus(id, postData, id).subscribe((data) => {
			this.fetchList();
			const msg = this.translate.instant('errorMessage.statuschange');
			this.alertService.success('Success', msg);
			this._comm.notifyShowHideLoader({ show: false });
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
		})
	}
	delete(id: any) {
		this._comm.notifyShowHideLoader({ show: true });
		this._client.deleteClient(id).subscribe(res => {
			this._comm.notifyShowHideLoader({ show: false });
			if (res['status'] == 201) {
				const msg = this.translate.instant('errorMessage.deleteItem');
				this.alertService.success('Success', msg);
				this.fetchList();
			}
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
		});
	}

	deleteClient(element) {
		if (element) {
			const dialogRef = this.dialog.open(AlertMatDialogComponent, {
				width: '500px',
				data: { id: element.id, name: this.translate.instant('Common.thisClient'), title: element.title }
			});
			dialogRef.afterClosed().subscribe(result => {
				if (result == element.id) {
					this.delete(element.id);
				}
			});
		}

	}

}
