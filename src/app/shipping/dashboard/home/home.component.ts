import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../_services';
import { MessageService } from '../../../_services/message.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Label, Color } from 'ng2-charts';
import { CommunicationService } from 'src/app/_services/communication.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DashboardService } from '../dashboard.service';
interface Place {
  imgSrc: string;
  name: string;
  description: string;
  charge: string;
  location: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  places: Array<Place> = [];
  countDataList: any = [];
  sellingDataList: any = [];
  currentYear: any = '';
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels: string[] = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[] = [];
  barChartColors: Color[] = [
    {
      backgroundColor: '#6BACEC'
    },
  ];
  yearRange = [];
  selectCurrentYear = '';
  dataEmpty = false;
  dataSource = new MatTableDataSource();
  sellingDataSource = new MatTableDataSource();
  displayedColumns: string[] = ['city', 'state', 'topshipment'];
  constructor(
    private accountService: AccountService,
    private _messageService: MessageService,
    private titleService: Title,
    public translate: TranslateService,
    public _dashboard: DashboardService,
    private _comm: CommunicationService,
    private _auth: AuthenticationService,
  ) {
    this.titleService.setTitle(this.translate.instant('PageTitle.shipping'));
  }
  ngOnInit() {
    this.accountService.userValue;
    this._messageService.changeMessage("Dashboard");
    setTimeout(() => {
      // this.enquiryList();
      this.currentYear = new Date().getFullYear();
      this.selectCurrentYear = this.currentYear;
      this.getYear();
      this.countList();
      this.salesGraph(this.currentYear);
      this.topSellingList();
    }, 500);

  }
  chartClicked(e: any): void {
  }

  chartHovered(e: any): void {
  }
  countList() {
    this._comm.notifyShowHideLoader({ show: true });
    this._dashboard.getCountList().subscribe(data => {
      this._comm.notifyShowHideLoader({ show: false });
      let resp = data.body;
      if (resp) {
        this.countDataList = resp;
      }
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
    });
  }
  salesGraph(year: any) {
    this._comm.notifyShowHideLoader({ show: true });
    this._dashboard.getSalesGraph(year).subscribe(data => {
      this._comm.notifyShowHideLoader({ show: false });
      let resp = data.body;
      if (resp) {
        this.barChartLabels = resp['labels'];
        this.barChartData = [
          {
            barThickness: 25,
            pointRadius: 30,
            pointStyle: 'circle',
            barPercentage: 0.5,
            data: resp['data'],
            label: 'Sales Month'
          }
        ];
        //this.countDataList = resp;
      }
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
    });
  }
  getYear() {
    var year = new Date().getFullYear();
    this.yearRange.push(year);
    for (var i = 1; i < 10; i++)
    {
      this.yearRange.push(year - i);
    }
    
  }
  selectYear(event)
  {
    if(event.value)
    {
      this.salesGraph(event.value);
    }
  }

  topSellingList() {
    this._comm.notifyShowHideLoader({ show: true });
    this._dashboard.getTopSellingList().subscribe(data => {
      this._comm.notifyShowHideLoader({ show: false });
      this.sellingDataList = data.body;
      if (this.sellingDataList.length > 0) {
        this.dataEmpty = false;
        this.dataSource.data = this.sellingDataList;
      } else {
        this.dataEmpty = true;
        this.dataSource.data = this.sellingDataList;
      }
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
    });
  }

}
