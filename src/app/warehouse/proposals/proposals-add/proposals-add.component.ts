import { Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Amenities } from '../../common-features/amenities';
import { Years } from '../../common-features/years';
import { CustomValidation } from '../../../_validators/custom-validation';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { ProfileService } from '../../profile/profile.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { ProposalsService } from '../proposals.service';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../_services/date.adapter';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-proposals-add',
  templateUrl: './proposals-add.component.html',
  styleUrls: ['./proposals-add.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class ProposalsAddComponent implements OnInit {
  pageTitle: any;
  proposalsAddForm: FormGroup;
  proposalsId: any;
  date = new FormControl(new Date());
  dataList: any;
  warehouseList: Object;
  from_date: any = '';
  to_date: any = '';
  minDate: any = '';
  order_code: any;
  warehouse_id: any;
  // to_date = this.datePipe.transform(to_date,"yyyy-MM-dd")
  //from_date : Date = new Date();
  // from_date : string = new Date().toDateString();
  //to_date : string = new Date().toDateString();
  constructor(private datePipe: DatePipe, private fb: FormBuilder, private profileService: ProfileService, private _comm: CommunicationService,
    private _alrt: AlertService, private router: Router, private route: ActivatedRoute, private proposalsService: ProposalsService) { }

  ngOnInit(): void {

    var date = new Date();
    console.log(this.datePipe.transform(date, "yyyy-MM-dd"));
    this.route.params.subscribe(param => {
      if (param && param.id) {
        this.pageTitle = "Edit";
        this.proposalsId = param.id;
        // this.checkArray = this.warehouseForm.get('amenities_facilities') as FormArray;
        //  this.disabled = true;
        // this.getWarehouseById(param.id);
      } else {
        this.pageTitle = "Add";
        // this.checkArray = this.warehouseForm.get('amenities_facilities') as FormArray;
      }
    });
    this.formInit();
    // this.fetchProposalsdata();
    this.fetchProposalsWarehouse();
    //  this.checkArray = this.warehouseForm.get('amenities_facilities') as FormArray;
  }

  formInit() {
    this.proposalsAddForm = this.fb.group({
      order_code: ['', [CustomValidation.validateWhiteSpace, Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      first_name: ['', [CustomValidation.validateWhiteSpace, Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      last_name: ['', [CustomValidation.validateWhiteSpace, Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      email: ['', [Validators.required, CustomValidation.validateEmail]],
      warehouse_name: ['', [Validators.required]],
      amount: ['', []],
      to_date: ['', []],
      from_date: ['', []],
    });
  }

  resetForm() {

    this.proposalsAddForm.reset();
    //  this.states = [];
    //this.cities = [];
    //this.images = [];
    //this.imgArr = [];

  }
  hasError(field: any) {
    return CustomValidation.hasError(this.proposalsAddForm, field);
  }

  arrHasError(formObj: any, field: any) {
    return CustomValidation.hasError(formObj, field);
  }
  fetchProposalsdata() {
    //const orderId = 'HYTX123678';
    this._comm.notifyShowHideLoader({ show: true });
    this.proposalsService.getProposalData(this.order_code).subscribe(data => {
      this._comm.notifyShowHideLoader({ show: false });
      if (data) {
        var resp = data.body;
        // resp['order_code'] = (resp['order_code']) ? resp['order_code'] : null;
        resp['email'] = (resp['email'] !== undefined) ? resp['email'] : null;
        resp['first_name'] = (resp['first_name'] !== undefined) ? resp['first_name'] : null;
        resp['last_name'] = (resp['last_name'] !== undefined) ? resp['last_name'] : null;
        this.proposalsAddForm.patchValue(resp);
      }
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
    });
  }
  fetchProposalsWarehouse() {
    this._comm.notifyShowHideLoader({ show: true });
    this.proposalsService.getProposalWarehouse().subscribe(data => {
      this._comm.notifyShowHideLoader({ show: false });
      const resp = data.body;
      this.warehouseList = resp;
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
    });
  }

  submitProposals() {
    if (this.proposalsAddForm.valid) {
      if (this.from_date && this.to_date) {
        const postData = { amount: this.proposalsAddForm.value.amount, from_date: this.from_date, to_date: this.to_date, order_code: this.proposalsAddForm.value.order_code }
        postData['warehouse_id'] = this.warehouse_id;
        this._comm.notifyShowHideLoader({ show: true });
        this.proposalsService.updateProposalsForm(postData).subscribe(res => {
          this._comm.notifyShowHideLoader({ show: false });
          const msg = (res && res['message']) ? res['message'] : 'Proposals updated successfully';
          this._alrt.success('Success', msg);
          this.router.navigate(["/warehouse/proposals/"]);
        }, error => {
          this._comm.notifyShowHideLoader({ show: false });
          const msg = (error && error['error_description']) ? error['error_description'] : 'Error occured during proposals creation.';
          this._alrt.error('Error', msg);
        });
      }

    }
  }
  onChangeWarehouse(data) {
    this.warehouse_id = data.value;

  }
  getFromDate(selectDate, event) {
    if (event.value) {
      this.from_date = event.value;
      this.from_date = this.datePipe.transform(this.from_date, "yyyy-MM-dd")
      //console.log("fromDate", this.from_date);
      // this.minDate = new Date(event.value);
      // this.proposalsAddForm.controls.to_date.setValue('');
    } else {
      //this.from_date = '';
      //this.minDate = '';
      //this.to_date ='';

    }
  }
  getToDate(selectDate,event) {
    //this.to_date = event.value;
    if (event.value) {
    //  console.log()
      this.to_date = event.value;
      this.to_date = this.datePipe.transform(this.to_date, "yyyy-MM-dd");
     // console.log("to_Date", this.to_date);
      //console.log(this.to_date)
    }
  }

}
