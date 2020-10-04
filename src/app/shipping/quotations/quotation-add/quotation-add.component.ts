import { Input, Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CustomValidation } from '../../../_validators/custom-validation';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../_services/date.adapter';
import {DatePipe} from '@angular/common';
import { QuotationService } from '../quotations.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-quotation-add',
  templateUrl: './quotation-add.component.html',
  styleUrls: ['./quotation-add.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class QuotationAddComponent implements OnInit {

  quotationAddForm: FormGroup;
  proposalsId:any;
  date = new FormControl(new Date());
  dataList: any;
  warehouseList: Object;
  from_date: any = '';
  to_date: any = '';
  minDate: any = '';
  order_code:any;
  warehouse_id: any;
 // to_date = this.datePipe.transform(to_date,"yyyy-MM-dd")
  //from_date : Date = new Date();
 // from_date : string = new Date().toDateString();
  //to_date : string = new Date().toDateString();
  constructor(private _messageService: MessageService , public translate: TranslateService, private datePipe: DatePipe, private fb: FormBuilder, private _comm: CommunicationService, 
    private _alrt: AlertService, private router: Router, private route: ActivatedRoute, private _quotationService:QuotationService) { }

    ngOnInit(): void {
      this._messageService.changeMessage('quotation');
      this.route.params.subscribe(param=>{
        if(param && param.id){
          this.proposalsId = param.id;
        }else{
        }
      });
      this.formInit();
    }

    formInit(){
      this.quotationAddForm = this.fb.group({
        order_code: ['', [ CustomValidation.validateWhiteSpace, Validators.required, Validators.minLength(2), Validators.maxLength(255) ]],
        first_name: ['', [ CustomValidation.validateWhiteSpace, Validators.required, Validators.minLength(3), Validators.maxLength(255) ]],
        last_name: ['', [ CustomValidation.validateWhiteSpace, Validators.required, Validators.minLength(3), Validators.maxLength(255) ]],
        email: ['', [ Validators.required, CustomValidation.validateEmail ]],
        amount: ['', [ ]],
        to_date: ['', []],
        from_date: ['', []],
      });
    }

    resetForm(){
      this.quotationAddForm.reset();
    }
    hasError(field: any) {
      return CustomValidation.hasError(this.quotationAddForm, field);
    }
  
    arrHasError(formObj: any, field: any) {
      return CustomValidation.hasError(formObj, field);
    }
    fetchQuotationdata(){
      const orderId = 'HYTX123678';
      this._comm.notifyShowHideLoader({ show: true });
      this._quotationService.getQuotationData(this.order_code).subscribe(data =>{
          this._comm.notifyShowHideLoader({ show: false });
          if (data) {
            var resp = data.body;
           // resp['order_code'] = (resp['order_code']) ? resp['order_code'] : null;
            resp['email'] = (resp['email'] !== undefined) ? resp['email'] : null;
            resp['first_name'] = (resp['first_name'] !== undefined) ? resp['first_name'] : null;
            resp['last_name'] = (resp['last_name'] !== undefined) ? resp['last_name'] : null;
            this.quotationAddForm.patchValue(resp);
          }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
      });
    }
    submitQuatation() {
      if (this.quotationAddForm.valid) {
       // const postData = JSON.parse(JSON.stringify(this.quotationAddForm.value));
      //  const postData = {amount: this.quotationAddForm.value.amount, from_date: this.from_date, to_date: this.to_date, order_code:this.quotationAddForm.value.order_code}
        const postData = {order_code:this.quotationAddForm.value.order_code,  from_date: this.from_date, to_date: this.to_date, amount: this.quotationAddForm.value.amount}
         this._comm.notifyShowHideLoader({ show: true });
         this._quotationService.updateQuotationForm(postData).subscribe(res => {
          this._comm.notifyShowHideLoader({ show: false });
          const msg = (res && res['message']) ? res['message'] : 'Quotation updated successfully';
            this._alrt.success('Success', msg);
            this.router.navigate(["/shipping/quotations/"]);
        }, error => {
          this._comm.notifyShowHideLoader({ show: false });
          const msg = (error &&  error['error_description']) ? error['error_description'] : 'Error occured during quotation creation.';
          this._alrt.error('Error', msg);
        });
      }	
    }
  
    getFromDate(selectDate, event) {
      if (event.value) {
        this.from_date = event.value;
        this.from_date = this.datePipe.transform(this.from_date, "yyyy-MM-dd")
      } else {
      }
    }
    getToDate(selectDate,event) {
      if (event.value) {
        this.to_date = event.value;
        this.to_date = this.datePipe.transform(this.to_date, "yyyy-MM-dd");
      }
    }


}
