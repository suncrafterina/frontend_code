import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray, FormControl } from '@angular/forms';
import { CustomValidation } from 'src/app/_validators/custom-validation';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';
import { CommunicationService } from 'src/app/_services/communication.service';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { VendorsService } from '../vendors.service';
import { TranslateService } from '@ngx-translate/core';
 
@Component({
  selector: 'app-factory-commission-edit',
  templateUrl: './factory-commission-edit.component.html',
  styleUrls: ['./factory-commission-edit.component.css']
})
export class FactoryCommissionEditComponent implements OnInit {

  matcher = new ValidationClassStateMatcher();
  categoryForm: FormGroup;
  factoryUser_id: any;
  peopleArray: any[];
  categoryListDataValue:any;
  constructor(private fb: FormBuilder,public translate: TranslateService, private vendorsService: VendorsService, private _comm: CommunicationService, private _alrt: AlertService, private router: Router, private route: ActivatedRoute)
   {
    this.formInIt();
    this.route.params.subscribe(params => {
      if (params && params.user_id) {
        setTimeout(() => {
          this.factoryUser_id = params.user_id;
          if (this.factoryUser_id) {
            this.getCategoryListData();
          }
        })
      }
    });
    }

  ngOnInit(): void {
   
  }
  formInIt() {
    this.categoryForm = this.fb.group({
      commission: ['', [Validators.required, CustomValidation.validateWhiteSpace, CustomValidation.validateNumberRequired,CustomValidation.validateNumberRequired]],
      category_level: ['', [Validators.required]],
      // id: ['', [Validators.required]],
    });
    // this.categoryForm.controls.category_level.setValue('LEVEL_ONE');
    // this.categoryForm.controls.id.setValue(0);
  }
  hasError(field: any) {
    return CustomValidation.hasError(this.categoryForm, field);
  }

  arrHasError(formObj: any, field: any) {
    return CustomValidation.hasError(formObj, field);
  }

  getCategoryListData() {  
      // this._comm.notifyShowHideLoader({ show: true });
      this.vendorsService.getCategoryList().subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        if (res) {
          //var resp =[];
          var resp = res;
          this.peopleArray = Object.values(res)
          // resp['title'] = (resp['title']) ? resp['title'] : null;
          if(resp['commission'])
          {
            resp['commission'] = (resp['commission'] !== undefined) ? resp['commission'] : null;
            this.categoryForm.patchValue(resp);
          }
         
        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
      });
    
  }

  categoryListData(data){
    this.categoryListDataValue = data.value;
    this.getCategoryListData();
    this.getCategoryDetails();
  }
  getCategoryDetails() {
    if (this.factoryUser_id) {
       const postData = {category_id: this.categoryListDataValue};
      const id =this.factoryUser_id;
      // const catetory_id =  this.categoryListData
      this._comm.notifyShowHideLoader({ show: true });
      this.vendorsService.getFactroyCommissionDetails(postData, id).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        if (res) {
          var resp = res.body;
          if(resp['commission'])
          {
            resp['commission'] = (resp['commission'] !== undefined) ? resp['commission'] : null;
            this.categoryForm.patchValue(resp);
          }
         
        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
      });
    }
  }
  catetory_id(factoryUser_id: any, catetory_id: any) {
    throw new Error("Method not implemented.");
  }
  updateCategory() {
    if (this.categoryForm.valid && this.factoryUser_id) {
			const postData = JSON.parse(JSON.stringify(this.categoryForm.value));
      postData['user_id'] = this.factoryUser_id;
      postData['category_id'] = this.categoryListDataValue;
			this._comm.notifyShowHideLoader({ show: true });
			this.vendorsService.updateFactoryCommission(postData).subscribe(res => {
				this._comm.notifyShowHideLoader({ show: false });
				const msg = (res && res['message']) ? res['message'] : this.translate.instant('errorMessage.commissionAdd');
    			this._alrt.success('Success', msg);
    			this.router.navigate(["/admin/vendors/factory-list"]);
			}, error => {
				this._comm.notifyShowHideLoader({ show: false });
        const msg = (error &&  error['error_description']) ? error['error_description'] :  this.translate.instant('errorMessage.commissionErr');
        this._alrt.error('Error', msg);
			});
		}	
  }

}
