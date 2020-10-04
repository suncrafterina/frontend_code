import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { CustomValidation } from '../../../_validators/custom-validation';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../../_services/message.service';
import { QuotationService } from '../quotations.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-quotation-detail',
  templateUrl: './quotation-detail.component.html',
  styleUrls: ['./quotation-detail.component.css']
})
export class QuotationDetailComponent implements OnInit {

  orderId = '';
  orderItemID:any
  orderData:any=[];
  data:any = '';
  order_status: any;
  quotationID: any;
  orderDataItems: any;
  
  constructor(private _quotationService: QuotationService, private _comm: CommunicationService,
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
    this._messageService.changeMessage('quotation');
  }
  getOrderDetail() {
    this._comm.notifyShowHideLoader({ show: true });
    this._quotationService.getOrderDetails(this.orderId).subscribe(res => {
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
      const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.errorEnquiryDetailFetching');
      this.alert.error('Error', msg);
    });

  }
  getOrderID(){
    this.router.navigate(["/shipping/quotations/quotation-log", this.orderItemID]);
  }

  getOrderItems(id) {
    this._comm.notifyShowHideLoader({ show: true });
    this._quotationService.getOrderDetailsItems(id).subscribe(res => {
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
      const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.errorEnquiryDetailFetching');
      this.alert.error('Error', msg);
    });

  }


  getOrdeStatus(data){

    this.order_status = data.order_status;
  }
  updateQuotationStatus(){

    this._comm.notifyShowHideLoader({ show: true });
    this.order_status = (this.order_status == "PENDING") ? "DISPATCHED" :(this.order_status == "DISPATCHED") ? "DELIVERED" : "";
    const postData ={order_status:this.order_status}
    const id= this.orderItemID;
    this._comm.notifyShowHideLoader({ show: false });
    this._quotationService.updateQuotation(id, postData).subscribe(res => {
      const msg = (res && res['message']) ? res['message'] : 'Update status successfully';
      this.alert.success('Success', msg);
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
      const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.errorStatusDetailFetching');
      this.alert.error('Error', msg);
    });
  }

}
