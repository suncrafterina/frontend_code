import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { AlertService } from 'src/app/_services/alert.service';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray, FormControl } from '@angular/forms';
import { CustomValidation } from 'src/app/_validators/custom-validation';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';
import { CommunicationService } from 'src/app/_services/communication.service';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { MessageService } from 'src/app/_services/message.service';
import { TranslateService } from '@ngx-translate/core';
 
@Component({
  selector: 'app-others-commission',
  templateUrl: './others-commission.component.html',
  styleUrls: ['./others-commission.component.css']
})
export class OthersCommissionComponent implements OnInit {

  matcher = new ValidationClassStateMatcher();
  categoryForm: FormGroup;
  categoryId: any;
  dataList1: any;
  constructor(private fb: FormBuilder,private _messageService: MessageService,public translate: TranslateService, private _category: CategoryService, private _comm: CommunicationService, private _alrt: AlertService, private router: Router, private route: ActivatedRoute) {
    this.formInIt();
  
    //this.fetchCategoryList();
    // this.route.params.subscribe(params => {
    //   if (params && params.id) {
    //     setTimeout(() => {
    //       this.categoryId = params.id;
    //       if (this.categoryId) {
    //       //  this.getCategoryDetails()
    //       }
    //     })
    //   }
    // });

  }


  ngOnInit(): void {
    this._messageService.changeMessage("commission");
    this.getCategoryDetails()
  }


  formInIt() {
    this.categoryForm = this.fb.group({
      shipper: ['', [Validators.required, CustomValidation.validateWhiteSpace, Validators.maxLength(100),CustomValidation.min(0),CustomValidation.max(100),CustomValidation.validateNumberRequired ]],
      warehouse: ['', [Validators.required, CustomValidation.validateWhiteSpace, Validators.maxLength(100),CustomValidation.min(0),CustomValidation.max(100),CustomValidation.validateNumberRequired]],
      agent: ['', [Validators.required, CustomValidation.validateWhiteSpace, Validators.maxLength(100),CustomValidation.min(0),CustomValidation.max(100),CustomValidation.validateNumberRequired]],
      // parent_id: ['', [Validators.required]],
    });
    // this.categoryForm.controls.category_level.setValue('LEVEL_ONE');
    // this.categoryForm.controls.parent_id.setValue(0);
  }
  hasError(field: any) {
    return CustomValidation.hasError(this.categoryForm, field);
  }

  arrHasError(formObj: any, field: any) {
    return CustomValidation.hasError(formObj, field);
  }
 
  getCategoryDetails() {
      this._comm.notifyShowHideLoader({ show: true });
      this._category.getOthersCommission().subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        if (res) {
          var resp = res.body;
          this.dataList1 = resp;
          resp['shipper'] = (resp['shipper']) ? resp['shipper'] : null;
          resp['warehouse'] = (resp['warehouse'] !== undefined) ? resp['warehouse'] : null;
          resp['agent'] = (resp['agent'] !== undefined) ? resp['agent'] : null;
          this.categoryForm.patchValue(resp);
         
        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
      });
  }
  updateCategory() {
    if (this.categoryForm.valid) {
			const postData = JSON.parse(JSON.stringify(this.categoryForm.value));
			postData['id'] = this.dataList1.id;
			this._comm.notifyShowHideLoader({ show: true });
			this._category.updateOthersCommission(postData).subscribe(res => {
				this._comm.notifyShowHideLoader({ show: false });
				const msg = (res && res['message']) ? res['message'] : 'Commission updated successfully';
    			this._alrt.success('Success', msg);
    			this.router.navigate(["/admin/category/cat-commission-list"]);
			}, error => {
				this._comm.notifyShowHideLoader({ show: false });
        const msg = (error &&  error['error_description']) ? error['error_description'] : 'Only number allows.';
        this._alrt.error('Error', msg);
			});
		}	
  }

}
