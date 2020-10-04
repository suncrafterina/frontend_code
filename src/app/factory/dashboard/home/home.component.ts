import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../_services/message.service';
import { AccountService, AlertService } from '../../../_services';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DashboardService } from '../dashboard.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { MatTableDataSource } from '@angular/material/table';

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
  enquiryDataList: any = [];
  countDataList: any = [];
  sellingDataList: any = [];
  show = false;
  dataEmpty = false;
  dataSource = new MatTableDataSource();
  sellingDataSource = new MatTableDataSource();
  displayedColumns: string[] = ['product_name', 'customer_name', 'created_at', 'action'];
  constructor(
    private _messageService: MessageService,
    private account: AccountService,
    private _auth: AuthenticationService,
    private titleService: Title,
    public translate: TranslateService,
    public _dashboard: DashboardService,
    private _comm: CommunicationService,
  ) {
    this.titleService.setTitle(this.translate.instant('PageTitle.factory'));
  }

  ngOnInit(): void {
    this._messageService.changeMessage("Dashboard");
    //this.AccountUserData();
    setTimeout(() => {
      this.enquiryList();
      this.countList();
      this.topSellingList();
    }, 500);
    this.places = [
      {
        imgSrc: 'assets/images/card-1.jpg',
        name: 'Cozy 5 Stars Apartment',
        description: `The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio"
              where you can enjoy the main night life in Barcelona.`,
        charge: '$899/night',
        location: 'Barcelona, Spain'
      },
      {
        imgSrc: 'assets/images/card-2.jpg',
        name: 'Office Studio',
        description: `The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio"
              where you can enjoy the night life in London, UK.`,
        charge: '$1,119/night',
        location: 'London, UK'
      },
      {
        imgSrc: 'assets/images/card-3.jpg',
        name: 'Beautiful Castle',
        description: `The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio"
              where you can enjoy the main night life in Milan.`,
        charge: '$459/night',
        location: 'Milan, Italy'
      }
    ];
  }

  AccountUserData() {
    localStorage.removeItem('userDetails');
    this.account.AccountUserData(this._auth.userData.access_token).subscribe((data) => {
      this._messageService.updateSelectedProfile(data);
      localStorage.setItem('userDetails', JSON.stringify(data));
    }, error => {

    })
  }
  enquiryList() {
    this._comm.notifyShowHideLoader({ show: true });
    this._dashboard.getEnquiryList().subscribe(data => {
      this._comm.notifyShowHideLoader({ show: false });
      this.enquiryDataList = data.body;
      if (this.enquiryDataList.length > 0) {
        this.dataEmpty = false;
        this.dataSource.data = this.enquiryDataList;
      } else {
        this.dataEmpty = true;
        this.dataSource.data = this.enquiryDataList;
      }
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
    });
  }
  topSellingList() {
    this._comm.notifyShowHideLoader({ show: true });
    this._dashboard.getTopSellingList().subscribe(data => {
      this._comm.notifyShowHideLoader({ show: false });
      this.sellingDataList = data.body;
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
    });
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

}
