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
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {AccountService} from 'src/app/_services/account.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  matcher = new ValidationClassStateMatcher();
  dataForm: FormGroup;
  userDetailsLogin: any;
  isLocationRunning: boolean = false;
  paymentData: any;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  userId = null;
  userData = { name: '', description: '', meta_tag_title: '', meta_description: '', meta_tag_keyword: '', tags: '', tag_list: '' };
  imageError = null;
  notMatch = false;
  countryList: any = [];
  country: any;
  productId: any;
  tagsList = [];
  addNew = 0;
  breadcumText= "addNew";
  productStatus:any = '';
  infostatus:any;
  constructor(private fb: FormBuilder, private getData: ProductService, 
    private _comm: CommunicationService, private _alrt: AlertService, 
    private router: Router, private route: ActivatedRoute, 
    private _auth: AuthenticationService, 
    public translate: TranslateService,
    public _account: AccountService
    ) {
    this.formInIt();
    this.route.params.subscribe(params => {
      if (params) {
        this.productId = params.id;
        if(this.productId)
        {
          this.addNew = 1;
          this.breadcumText="edit";
        }
        this.getGeneralInformation();
        this.getProductStatus(this.productId);
      }
    });

  }

  ngOnInit(): void {
  }

  formInIt() {
    this.dataForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(100), CustomValidation.validateWhiteSpace]],
      description: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(1000), CustomValidation.validateWhiteSpace]],
      meta_tag_title: ['', [Validators.minLength(3),Validators.maxLength(255), CustomValidation.validateWhiteSpace]],
      meta_description: ['', [ Validators.minLength(3),Validators.maxLength(255)]],
      meta_tag_keyword: ['', [ Validators.minLength(3),Validators.maxLength(255)]],
      tags: [''],
      tag_list: [''],
    });
  }

  hasError(field: any) {
    return CustomValidation.hasError(this.dataForm, field);
  }

  arrHasError(formObj: any, field: any) {
    return CustomValidation.hasError(formObj, field);
  }
  addProduct() {
    let newPostObject = [];
    if (this.dataForm.valid) {
      if (this.tagsList) {
        this.tagsList.forEach(element => {
          if ((element.title) && (!newPostObject.includes(element.title))) {
            newPostObject.push(element.title);
          }
        });
      }
      this.dataForm.controls.tags.setValue(newPostObject);
      const postData = JSON.parse(JSON.stringify(this.dataForm.value));
      this.getData.addProduct(postData).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        this.router.navigate(['/factory/product/specification/',res['id']]);
        const msg = (res && res['message']) ? res['message'] : this.translate.instant('errorMessage.addedSuccessfully');
        this._alrt.success('Success', msg);
        //this.router.navigate(["/factory/product/"]);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error_description']) ? error['error_description'] :this.translate.instant('errorMessage.ErrorOccuredDuringProductCreation');
        this._alrt.error('Error', msg);
      });
    }
  }
  updateProduct() {
    let newPostObject = [];
    if (this.dataForm.valid && this.productId) {
      if(this.tagsList)
      {
        this.tagsList.forEach(element => {
          if ((element.title) && (!newPostObject.includes(element.title))) {
            newPostObject.push(element.title);
          }
        });
      }
      this.dataForm.controls.tags.setValue(newPostObject);
      const postData = JSON.parse(JSON.stringify(this.dataForm.value));
      postData['id'] = this.productId;
			this._comm.notifyShowHideLoader({ show: true });
			this.getData.updateProductGeneral(this.productId,postData).subscribe(res => {
				this._comm.notifyShowHideLoader({ show: false });
				const msg = (res && res['message']) ? res['message'] : this.translate.instant('errorMessage.updatedSuccessfully');
    			this._alrt.success('Success', msg);
          this.router.navigate(['/factory/product/specification/',this.productId]);
			}, error => {
				this._comm.notifyShowHideLoader({ show: false });
				const msg = (error && error['error'] && error['error']['errorMessage']) ? error['error']['errorMessage'] : this.translate.instant('errorMessage.ErrorOccuredDuringProductCreation');
    			this._alrt.error('Error', msg);
			});
		}	
  }
  getGeneralInformation() {
    if (this.productId) {
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.getProductGeneralInformation(this.productId).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        if (res) {
          var resp = res;
          this.gettagsList(resp['tags']);
          this.dataForm.patchValue(resp);

        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
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
  gettagsList(itemList) {
    if (itemList) {
      itemList.forEach(element => {
        this.tagsList.push({ 'title': element.trim() });
      });
    }
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tagsList.push({ 'title': value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(item): void {
    const index = this.tagsList.indexOf(item);
    if (index >= 0) {
      this.tagsList.splice(index, 1);
    }
  }

}
