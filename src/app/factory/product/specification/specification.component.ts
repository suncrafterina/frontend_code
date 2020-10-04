import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { AlertService } from 'src/app/_services/alert.service';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomValidation } from 'src/app/_validators/custom-validation';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';
import { CommunicationService } from 'src/app/_services/communication.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { ConstantService } from 'src/app/_services/constant.service';
import {AccountService} from 'src/app/_services/account.service';
@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.scss']
})
export class SpecificationComponent implements OnInit {

  matcher = new ValidationClassStateMatcher();
  dataForm: FormGroup;
  userData = { sku: '', manufacturer: '', model: '', price: '', dimension: '', length_unit: '', weight: '', weight_unit: '' };
  imageError = null;
  notMatch = false;
  countryList: any = [];
  country: any;
  productId: any;
  tagsList = [];
  LengthUnitList: any = [];
  weightUnitList: any = [];
  productStatus:any = '';
  infostatus:any;
  constructor(private fb: FormBuilder, private _constant: ConstantService, 
    private getData: ProductService, private _comm: CommunicationService, 
    private _alrt: AlertService, private router: Router, 
    private route: ActivatedRoute, private _auth: AuthenticationService, 
    public translate: TranslateService, public _account: AccountService) {
    this.getAdditionalInfo();
    this.formInIt();
    this.route.params.subscribe(params => {
      if (params) {
        this.productId = params.id;
        this.getDetails();
        this.getProductStatus(this.productId);
      }
    });

  }

  ngOnInit(): void {

  }
  formInIt() {
    this.dataForm = this.fb.group({
      sku: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), CustomValidation.validateWhiteSpace]],
      manufacturer: ['', [Validators.minLength(3), Validators.maxLength(255), CustomValidation.validateWhiteSpace]],
      model: ['', [ Validators.minLength(3),Validators.maxLength(15),CustomValidation.validateWhiteSpace]],
      price: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/\d+(\.\d{1,2})?$/)]],
      dimension: ['', [Validators.minLength(3), Validators.pattern(/^\d+(\.\d+)?x\d+(\.\d+)?x\d+(\.\d+)?$/)]],
      length_unit: [''],
      weight: ['', [CustomValidation.validateWhiteSpace, Validators.pattern(/\d+(\.\d{1,2})?$/)]],
      weight_unit: [''],

    });
  }
  hasError(field: any) {
    return CustomValidation.hasError(this.dataForm, field);
  }

  arrHasError(formObj: any, field: any) {
    return CustomValidation.hasError(formObj, field);
  }

  getDetails() {
    if (this.productId) {
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.getSpecificationDetails(this.productId).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        if (res) {
          var resp = res;
          this.dataForm.patchValue(resp);

        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
      });
    }
  }
  addProduct() {
    if (this.dataForm.valid && this.productId) {
      this.dataForm.value.length_unit = (this.dataForm.value.length_unit == "") ? null : this.dataForm.value.length_unit;
      this.dataForm.value.weight_unit = (this.dataForm.value.weight_unit == "") ? null : this.dataForm.value.weight_unit;
      const postData = JSON.parse(JSON.stringify(this.dataForm.value));
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.addSpecificationDetails(this.productId, postData).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (res && res['message']) ? res['message'] :this.translate.instant('errorMessage.productSpecificationAddedSuccessfully');
        this._alrt.success('Success', msg);
        this.router.navigate(['/factory/product/dynamic-attributes/',this.productId]);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.errorOccuredDuringProductSpecificationCreation');
        this._alrt.error('Error', msg);
      });
    }
  }
  getAdditionalInfo() {
    this.getData.getAdditionalInfo().subscribe((res: any) => {
      if (res.length_unit) {
        var result = Object.keys(res.length_unit).map(function (key) {
          return res.length_unit[key];
        });
        this.LengthUnitList = result;
      }
      if (res.weight_unit) {
        var result1 = Object.keys(res.weight_unit).map(function (key) {
          return res.weight_unit[key];
        });
        this.weightUnitList = result1;
      }

    }, error => {

    });
  }
  managelengthValidation()
  {
    this.dataForm.get('length_unit').clearValidators();
    if (this.dataForm.value.dimension) {
      this.dataForm.controls['length_unit'].setErrors({ required: true })
    }else
    {
      this.dataForm.patchValue({ length_unit: '' });
    }
  }
  manageweightValidation()
  {
    this.dataForm.get('weight_unit').clearValidators();
    if (this.dataForm.value.weight) {
      this.dataForm.controls['weight_unit'].setErrors({ required: true })
    }else
    {
      this.dataForm.patchValue({ weight_unit: '' });
    }
  }
  getProductStatus(id) {
    if (this.productId) {
      this._account.getProductStatus(this.productId).subscribe(res => {
        if (res) {
          var resp = res;
          this.infostatus = resp['info_status'];
        }
      }, error => {
      });
    }
  }

}
