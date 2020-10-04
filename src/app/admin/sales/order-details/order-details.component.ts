import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../_services/alert.service';
import { SalesService} from '../sales.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { CustomValidation } from '../../../_validators/custom-validation';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../../_services/message.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId = '';
  orderData:any = '';
  data:any = '';
  
  constructor(private _sales: SalesService, private _comm: CommunicationService,
    private router: Router, private route: ActivatedRoute, private alert: AlertService,
    private fb: FormBuilder, public translate: TranslateService, private _messageService: MessageService) {
    this.route.params.subscribe(param => {
      if (param.id && param) {
        this.orderId = param.id;
        if (this.orderId) {
          this.getOrderDetail();
        }
      }
    });
  }


  ngOnInit(): void {
    this._messageService.changeMessage('orders');
  }
  getOrderDetail() {
    this._comm.notifyShowHideLoader({ show: true });
    this._sales.getOrderDetails(this.orderId).subscribe(res => {
      let resp = res;
      if (resp) {
        this.data = resp;
        this.orderData = resp;
        this._comm.notifyShowHideLoader({ show: false });
      }
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
      const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.errorEnquiryDetailFetching');
      this.alert.error('Error', msg);
    });

  }


}
