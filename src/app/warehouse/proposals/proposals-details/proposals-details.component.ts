import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { CustomValidation } from '../../../_validators/custom-validation';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../../_services/message.service';
import { StarRatingComponent } from 'ng-starrating';
import { ProposalsService } from '../proposals.service';

@Component({
  selector: 'app-proposals-details',
  templateUrl: './proposals-details.component.html',
  styleUrls: ['./proposals-details.component.css']
})
export class ProposalsDetailsComponent implements OnInit {

  orderId = '';
  orderItemID:any
  orderData:any=[];
  data:any = '';
  order_status: any;
  quotationID: any;
  orderDataItems: any;
  
  constructor(private _ProposalsService: ProposalsService, private _comm: CommunicationService,
    private router: Router, private route: ActivatedRoute, private alert: AlertService,
    private fb: FormBuilder, public translate: TranslateService, private _messageService: MessageService) {
    this.route.params.subscribe(param => {
      if (param.id && param) {
        this.orderId = param.id;
        this.orderItemID = param.id;
        if (this.orderId) {
          this.getOrderDetail();
        }
      }
    });
  }


  ngOnInit(): void {
    this._messageService.changeMessage('proposals');
  }
  getOrderDetail() {
    this._comm.notifyShowHideLoader({ show: true });
    this._ProposalsService.getOrderDetails(this.orderId).subscribe(res => {
      let resp = res;
      if (resp) {
        this.data = resp;
        if(this.data)
        {
          this.getOrderItems(this.data.id);
        }
        this.orderData = JSON.parse(JSON.stringify(res));
        this._comm.notifyShowHideLoader({ show: false });
      }
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
      const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.errorpropopsalsDetails');
      this.alert.error('Error', msg);
    });

  }
  getOrderID(){
    this.router.navigate(["/shipping/quotations/quotation-log", this.orderItemID]);
  }

  getOrderItems(id) {
    this._comm.notifyShowHideLoader({ show: true });
    this._ProposalsService.getOrderDetailsItems(id).subscribe(res => {
      let resp = res;
      if (resp) {
         this.orderDataItems = JSON.parse(JSON.stringify(res));
        //  this.orderDataItems.forEach(element => {
        //    let data={ name:element.name, image_file:element.image_file, qty :element.qty};
        //   this.itemsDataNmae.push(data.name);
           
        //  });
        // console.log(" this.orderDataItems",  this.itemsDataNmae);
        this._comm.notifyShowHideLoader({ show: false });
      }
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
      const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.errorpropopsalsItems');
      this.alert.error('Error', msg);
    });

  }

}
