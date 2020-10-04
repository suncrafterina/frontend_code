import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../_services';
import { MessageService } from '../../../_services/message.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Label, Color } from 'ng2-charts';
import { DashboardService } from '../dashboard.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/_services/authentication.service';

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
  topCustomerDataList: any = [];
  topSellingProductList: any = [];
  currentYear: any = '';
  yearRange = [];
  selectCurrentYear = '';
  barChartOptions: any = [];
  barChartLabels: string[] = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[] = [];
  barChartColors: Color[] = [
    {
      backgroundColor: '#6BACEC'
    },
  ];

  constructor(
    private accountService: AccountService,
    private _messageService: MessageService,
    private titleService: Title,
    public translate: TranslateService,
    public _dashboard: DashboardService,
    private _comm: CommunicationService,
    private _auth: AuthenticationService,

  ) {
    this.titleService.setTitle(this.translate.instant('PageTitle.category'));
  }
  ngOnInit() {
    this.accountService.userValue;
    this._messageService.changeMessage('dashboard');
    setTimeout(() => {
      // this.enquiryList();
      this.currentYear = new Date().getFullYear();
      this.selectCurrentYear = this.currentYear;
      this.getYear();
      this.countList();
      this.salesGraph(this.currentYear);
      this.topCustomerList();
      this.topSellingProduct();
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
        this.barChartOptions = {
          scaleShowVerticalLines: false,
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  return '$' + value;
                }
              }
            }]
          },
          legend: {
            display: false
          },
          tooltips: {
            mode: 'label',
            custom: function (tooltip) {
              if (!tooltip) return;
              tooltip.displayColors = false;
            },
            callbacks: {
              label: function () {
                return "";
              },
              title: function (tooltipItem)
              {
                var sales = "Sales: $" + Number(tooltipItem[0].yLabel);
                var month = "Month : " + tooltipItem[0].xLabel + " " + year;
                var multistringText = [sales];
                multistringText.push(month);
                return multistringText;
              }
            }
            // callbacks: {
            //     label: function(tooltipItem) {
            //         return "Sales: $" + Number(tooltipItem.yLabel) + "Month : "+ tooltipItem.xLabel;
            //     }
            // }
          }
        }
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
    for (var i = 1; i < 10; i++) {
      this.yearRange.push(year - i);
    }

  }
  selectYear(event) {
    if (event.value) {
      this.salesGraph(event.value);
    }
  }
  topCustomerList() {
    this._comm.notifyShowHideLoader({ show: true });
    this._dashboard.getTopCustomerList().subscribe(data => {
      this._comm.notifyShowHideLoader({ show: false });
      let resp = data.body;
      if (resp) {
        this.topCustomerDataList = resp;
      }
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
    });
  }
  topSellingProduct() {
    this._comm.notifyShowHideLoader({ show: true });
    this._dashboard.getTopSellingProductList().subscribe(data => {
      this._comm.notifyShowHideLoader({ show: false });
      let resp = data.body;
      if (resp) {
        this.topSellingProductList = resp;
      }
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
    });
  }

}
