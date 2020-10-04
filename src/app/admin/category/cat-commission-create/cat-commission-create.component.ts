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
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cat-commission-create',
  templateUrl: './cat-commission-create.component.html',
  styleUrls: ['./cat-commission-create.component.css']
})
export class CatCommissionCreateComponent implements OnInit {
  matcher = new ValidationClassStateMatcher();
  categoryForm: FormGroup;
  categoryId: any;
  constructor(private fb: FormBuilder, public translate: TranslateService, private _category: CategoryService, private _comm: CommunicationService, private _alrt: AlertService, private router: Router, private route: ActivatedRoute)
   {
    this.formInIt();
    this.route.params.subscribe(params => {
      if (params && params.id) {
        setTimeout(() => {
          this.categoryId = params.id;
          if (this.categoryId) {
            this.getCategoryDetails()
          }
        })
      }
    });
    }

  ngOnInit(): void {
  }
  formInIt() {
    this.categoryForm = this.fb.group({
      title: ['', [Validators.required, CustomValidation.validateWhiteSpace, Validators.maxLength(100), Validators.minLength(3)]],
      commission: ['', [Validators.required, CustomValidation.validateWhiteSpace, CustomValidation.validateNumberRequired,CustomValidation.validateNumberRequired]],
      // category_level: ['', [Validators.required]],
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

  getCategoryDetails() {
    if (this.categoryId) {
      this._comm.notifyShowHideLoader({ show: true });
      this._category.getcatCommissionDetails(this.categoryId).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        if (res) {
          var resp = res;
          resp['title'] = (resp['title']) ? resp['title'] : null;
          resp['commission'] = (resp['commission'] !== undefined) ? resp['commission'] : null;
          this.categoryForm.patchValue(resp);
         
        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
      });
    }
  }
  updateCategory() {
    if (this.categoryForm.valid && this.categoryId) {
			const postData = JSON.parse(JSON.stringify(this.categoryForm.value));
			postData['id'] = this.categoryId;
			this._comm.notifyShowHideLoader({ show: true });
			this._category.updateCategoryCommission(postData, this.categoryId).subscribe(res => {
				this._comm.notifyShowHideLoader({ show: false });
				const msg = (res && res['message']) ? res['message'] : this.translate.instant('errorMessage.commissionUpdate');
    			this._alrt.success('Success', msg);
    			this.router.navigate(["/admin/category/cat-commission-list"]);
			}, error => {
				this._comm.notifyShowHideLoader({ show: false });
        const msg = (error &&  error['error_description']) ? error['error_description'] :this.translate.instant('errorMessage.commissionUpdateErr');
        this._alrt.error('Error', msg);
			});
		}	
  }
}
