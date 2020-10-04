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
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { CategoryService } from '../category.service';
import { TranslateService } from '@ngx-translate/core';
 
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-add-option-create',
  templateUrl: './add-option-create.component.html',
  styleUrls: ['./add-option-create.component.css']
})
export class AddOptionCreateComponent implements OnInit {
  matcher = new ValidationClassStateMatcher();
  addOptionForm: FormGroup;
  categoryId: any;
  subcategoryId: any;
  attributeId: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  attributeList = [];
  resp:any = [];
  itemList = {};
  categoryTitle:any;
  subcategoryTitle:any;
  constructor(private fb: FormBuilder,public translate: TranslateService, private _category: CategoryService, private _comm: CommunicationService, private _alrt: AlertService, private router: Router, private route: ActivatedRoute) { 
    this.formInIt();
    this.route.params.subscribe(params => {
      console.log(params);
      if (params && params.cat) {
        setTimeout(() => {
          this.categoryId = params.cat;
          this.subcategoryId = params.subcat;
          this.attributeId = params.id;
          this.getbreadcum();
          if (this.attributeId) {
            this.getCategoryDetails()
          }
        })
      }
    });
  }

  ngOnInit(): void {
  }
  formInIt() {
    this.addOptionForm = this.fb.group({
      title: ['', [Validators.required, CustomValidation.validateWhiteSpace, Validators.maxLength(100), Validators.minLength(3)]],
      attributes_values: ['', [CustomValidation.validateWhiteSpace]],
      values: [''],
      category_id: [''],
      
    });
    //this.addOptionForm.controls.category_id.setValue();
    //this.addOptionForm.controls.parent_id.setValue(0);
  }
  hasError(field: any) {
    return CustomValidation.hasError(this.addOptionForm, field);
  }

  arrHasError(formObj: any, field: any) {
    return CustomValidation.hasError(formObj, field);
  }
  addOption() {
    let newPostObject = [];
    if (this.addOptionForm.valid) {
      if(this.attributeList)
      {
        this.attributeList.forEach(element => {
          if((element.title) && (!newPostObject.includes(element.title)))
          {
            newPostObject.push(element.title);
          }
        });
      }
      this.addOptionForm.controls.values.setValue(newPostObject);
      this.addOptionForm.controls.category_id.setValue(this.subcategoryId);
      const postData = JSON.parse(JSON.stringify(this.addOptionForm.value));
      if(postData['values'].length == 0)
      {
        this.addOptionForm.controls['attributes_values'].setErrors({ required: true });
      }else
      {
        this._comm.notifyShowHideLoader({ show: true });
      }
        this._category.addOption(postData).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (res && res['message']) ? res['message'] :  this.translate.instant('errorMessage.optionAdd');
        this._alrt.success('Success', msg);
        this.router.navigate(["/admin/category/add-option/"+this.categoryId+'/'+this.subcategoryId]);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error &&  error['error_description']) ? error['error_description'] :  this.translate.instant('errorMessage.optionErr');
        this._alrt.error('Error', msg);
      });
    }
  }
  getCategoryDetails() {
    if (this.attributeId) {
      this._comm.notifyShowHideLoader({ show: true });
      this._category.getOptionDetails(this.attributeId).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        if (res) {
          var resp = res;
          resp['title'] = (resp['title']) ? resp['title'] : null;
          this.getAttributeList(resp['values']);
          //this.attributeList = resp['values'];
          this.addOptionForm.patchValue(resp);
         
        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
      });
    }
  }
  updateAddOption() {
    let newPostObject = [];
    if (this.addOptionForm.valid && this.categoryId) {
      if(this.attributeList)
      {
        this.attributeList.forEach(element => {
          if((element.title) && (!newPostObject.includes(element.title)))
          {
            newPostObject.push(element.title);
          }
        });
      }
      this.addOptionForm.controls.values.setValue(newPostObject);
      const postData = JSON.parse(JSON.stringify(this.addOptionForm.value));
      if(postData['values'].length == 0)
      {
        this.addOptionForm.controls['attributes_values'].setErrors({ required: true });
      }
     	postData['id'] = this.attributeId;
			this._comm.notifyShowHideLoader({ show: true });
			this._category.updateOption(postData).subscribe(res => {
				this._comm.notifyShowHideLoader({ show: false });
				const msg = (res && res['message']) ? res['message'] :  this.translate.instant('errorMessage.optionUpdate');
    			this._alrt.success('Success', msg);
    			this.router.navigate(["/admin/category/add-option/"+this.categoryId+'/'+this.subcategoryId]);
			}, error => {
				this._comm.notifyShowHideLoader({ show: false });
				const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.optionErr');
    			this._alrt.error('Error', msg);
			});
		}	
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
 // Add our fruit
    if ((value || '').trim()) {
      this.attributeList.push({'title':value.trim(),'disable':true});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(item): void {
    const index = this.attributeList.indexOf(item);
    if (index >= 0) {
      this.attributeList.splice(index, 1);
    }
  }
  getAttributeList(itemList)
  { 
    if(itemList){
      for (var prop in itemList) {
        //console.log( prop + " = " + itemList[prop]);
        this.attributeList.push({'title':prop.trim(),'disable':itemList[prop]});
      }
      console.log(  this.attributeList);
    }
  }
  getbreadcum() {
		if (this.subcategoryId) {
		  this._category.getCategoryDetails(this.subcategoryId).subscribe(res => {
			if (res) {
				this.subcategoryTitle = res['title'];
			}
		  });
		}
		if (this.categoryId) {
			this._category.getCategoryDetails(this.categoryId).subscribe(res => {
			  if (res) {
          console.log(res);
				  this.categoryTitle = res['title'];
			  }
			});
		  }
	  }

}
