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
import { element } from 'protractor';
import {AccountService} from 'src/app/_services/account.service';

 
@Component({
  selector: 'app-dynamic-attributes',
  templateUrl: './dynamic-attributes.component.html',
  styleUrls: ['./dynamic-attributes.component.scss']
})
export class DynamicAttributesComponent implements OnInit {
  matcher = new ValidationClassStateMatcher();
  dataForm: FormGroup;
  userData = { category_id: '' };
  notMatch = false;
  productId: any;
  categoryList: any = [];
  selectcategoryId = '';
  arrayLen = 0;
  optionArrayLen = 0;
  categoryId: any;
  attributeList: any = [];
  attributesListArr: any = [];
  optionListArr = [];
  attributeValue: any = [];
  optionValue: any = [];
  attributeLength: any = 0;
  optionLength: any = 0;
  eventOption: any = [];
  basePrice: any = 0;
  productStatus:any = '';
  infostatus:any;
  constructor(private fb: FormBuilder, private _constant: ConstantService,public _account: AccountService, private getData: ProductService, private _comm: CommunicationService, private _alrt: AlertService, private router: Router, private route: ActivatedRoute, private _auth: AuthenticationService, public translate: TranslateService) {
    this.formInIt();
    this.route.params.subscribe(params => {
      if (params) {
        this.productId = params.id;
        this.getDetails();
        this.getCategoryList();
        this.getBasePrice();
        this.getProductStatus(this.productId);
      }
    });
  }
  data = { attributes: '' }
  ngOnInit(): void {
    
  }

  formInIt() {
    this.dataForm = this.fb.group({
      category_id: ['', [Validators.required, CustomValidation.validateWhiteSpace]],
      attributes: this.fb.array([]),
      options: this.fb.array([]),
    });
    //this.addMore();
    //this.addOptionMore();
  }

  getDetails() {
    if (this.productId) {
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.getAttributOption(this.productId).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        if (res) {
          var resp = res;
          this.dataForm.patchValue(resp);
          this.selectcategoryId = resp['category_id'];
          this.eventOption = { 'value': resp['category_id'] };
          this.onCategorySelected(this.eventOption, 0);
          if (res['attributes']) {
            if (res['attributes'].length) {
              this.attributeLength = res['attributes'].length;
              for (let i = 0; i < res['attributes'].length; i++) {
                this.addMore();
              }
              if (res['attributes'].length >= 1) {
                setTimeout(() => {
                  res['attributes'].forEach((element, index) => {
                    setTimeout(() => {
                      this.autoSetAttributeName(element.attribute_id, index);
                    }, 1000);
                    this.dataForm.get('attributes')['controls'][index].patchValue({ attribute_id: element.attribute_id });
                    this.dataForm.get('attributes')['controls'][index].patchValue({ attribute_value_id: element.attribute_value_id });
                  });
                }, 1000);
              }

              //this.supplyForm.patchValue({supply: res['formData']});
            }
          }
          if (res['options']) {
            if (res['options'].length) {
              this.optionLength = res['options'].length;
              for (let i = 0; i < res['options'].length; i++) {
                this.addOptionMore();
              }
              setTimeout(() => {
                res['options'].forEach((element, index) => {
                  setTimeout(() => {
                    this.autoSetOptionName(element.option_id, index);
                  }, 1000);
                  this.dataForm.get('options')['controls'][index].patchValue({ additional_cost: element.additional_cost });
                  this.dataForm.get('options')['controls'][index].patchValue({ option_id: element.option_id });
                  this.dataForm.get('options')['controls'][index].patchValue({ option_value_id: element.option_value_id });
                });
              }, 500);
              //this.supplyForm.patchValue({supply: res['formData']});
            }
          }
        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
      });
    }
  }
  getCategoryList() {
    if (this.productId) {
      this.getData.getCategoryList().subscribe(res => {
        if (res) {
          var resp = res;
          this.categoryList = resp;
        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
      });
    }
  }
  add() {
    const postData = JSON.parse(JSON.stringify(this.dataForm.value));
    if (postData) {
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.addAttributOption(this.productId, postData).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        if (res) {
          var resp = res;
          this.router.navigate(['/factory/product/gallery/',res['id']]);
          const msg = (res && res['message']) ? res['message'] : this.translate.instant('errorMessage.productAttributesAddedSuccessfully');
          this._alrt.success('Success', msg);
        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error_description']) ? error['error_description'] :  this.translate.instant('errorMessage.errorOccuredDuringProductAttributesCreation');

        this._alrt.error('Error', msg);
      });

    }
  }
  onCategorySelected(event, remove) {
    const categoryId = event.value;
    let attributesArr = [];
    let optionArr = [];
    this.attributeList = [];
    this.attributesListArr = [];
    this.optionListArr = [];
    if (remove) {
      if (this.selectcategoryId == categoryId) {
        this.getDetails();
        this.removeAllelement(0);
      } else {
        this.removeAllelement(1);
      }
    }
    this.getArrayList();
    this.getOptionArrayList();
    if (categoryId) {
      this.getData.getAttributesAndOptions(categoryId).subscribe(data => {
        if (data) {
          data = JSON.parse(JSON.stringify(data));
          attributesArr = data['attributes'];
          optionArr = data['options'];
          if (attributesArr) {
            attributesArr.forEach((element, index) => {
              this.attributesListArr[index] = { 'id': element.id, 'title': element.title, 'elements': element.attributeValues };
            });
            this.attributeLength = this.attributesListArr.length;
          }
          if (optionArr) {
            optionArr.forEach((element, index) => {
              this.optionListArr[index] = { 'id': element.id, 'title': element.title, 'elements': element.optionValue };
            });
            this.optionLength = this.optionListArr.length;
          }
        }
      }, error => {

      });
    }
  }
  getArrayList() {
    return this.dataForm.get('attributes')['controls'];
  }
  getOptionArrayList() {
    return this.dataForm.get('options')['controls'];
  }
  removeAllelement(add) {
    const control = <FormArray>this.dataForm.get('attributes');
    control.controls = [];
    const controlOption = <FormArray>this.dataForm.get('options');
    controlOption.controls = [];
    if (add) {
      this.addMore();
      this.addOptionMore();
    }

  }
  setProductName(event, i) {
    var index = this.attributesListArr.findIndex(x => x.id === event.value);
    this.attributeValue[i] = this.attributesListArr[index]['elements'];
  }
  autoSetAttributeName(id, i) {
    if (this.attributesListArr) {
      var index = this.attributesListArr.findIndex(x => x.id === id);
      this.attributeValue[i] = this.attributesListArr[index]['elements'];
    }
  }

  setOptionName(event, i) {
    var index = this.optionListArr.findIndex(x => x.id === event.value);
    this.optionValue[i] = this.optionListArr[index]['elements'];
  }
  autoSetOptionName(id, i) {
    if (this.optionListArr) {
      var index = this.optionListArr.findIndex(x => x.id === id);
      this.optionValue[i] = this.optionListArr[index]['elements'];
    }
  }

  addMore() {
    const control = <FormArray>this.dataForm.get('attributes');
    control.push(
      this.fb.group({
        attribute_id: ['', [Validators.required]],
        attribute_value_id: ['', [Validators.required, RxwebValidators.unique()]]
      })
    );
    this.arrayLen = control.length;
    //this.attributesListArr[this.arrayLen] = JSON.parse(JSON.stringify(this.supplyOriginalList));
  }
  addOptionMore() {
    const control = <FormArray>this.dataForm.get('options');
    control.push(
      this.fb.group({
        option_id: ['', [Validators.required]],
        option_value_id: ['', [Validators.required, RxwebValidators.unique()]],
        additional_cost: ['', [Validators.required, Validators.maxLength(8), Validators.pattern(/\d+(\.\d{1,2})?$/)]]
      })
    );
    this.optionArrayLen = control.length;
    //this.attributesListArr[this.arrayLen] = JSON.parse(JSON.stringify(this.supplyOriginalList));
  }

  removeOptionItem(i) {
    const control = <FormArray>this.dataForm.get('options');
    control.removeAt(i);
    this.optionArrayLen = control.length;
    this.optionValue.splice(i, 1);
  }
  removeItem(i) {
    const control = <FormArray>this.dataForm.get('attributes');
    control.removeAt(i);
    this.arrayLen = control.length;
    this.attributeValue.splice(i, 1);

  }
  getBasePrice() {
    if (this.productId) {
      this.getData.getSpecificationDetails(this.productId).subscribe(res => {
        if (res) {
          var resp = res;
          this.basePrice = resp['price'];
        }
      }, error => {
      });
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
