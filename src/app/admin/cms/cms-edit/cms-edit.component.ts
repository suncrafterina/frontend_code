import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidation } from '../../../_validators/custom-validation';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { CmsService } from '../cms.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-cms-edit',
	templateUrl: './cms-edit.component.html',
	styleUrls: ['./cms-edit.component.css']
  })
export class CmsEditComponent implements OnInit {

	matcher = new ValidationClassStateMatcher();
	cmsForm: FormGroup;
	cmsSlug: any;
	faqPageTitle: string;
	constructor(private fb: FormBuilder, public translate: TranslateService, private _cmsService: CmsService, private router: Router, private _comm: CommunicationService, private _alrt: AlertService, private route: ActivatedRoute) {
		this.formInIt();
		this.route.params.subscribe(param =>{
			if(param.slug && param){
				this.cmsSlug = param.slug;
				this.getCMSDetail();
			}
		});
	}

	ngOnInit(): void {
	}

	formInIt() {
		this.cmsForm = this.fb.group({
			title: ['', [ CustomValidation.validateWhiteSpace, Validators.required, Validators.minLength(3), Validators.maxLength(255) ]],
			description: ['', [CustomValidation.validateWhiteSpace, Validators.required, Validators.minLength(3), Validators.maxLength(1000) ]], 
		});
	}

	getCMSDetail(){

		console.log("getCMSDetail()");
		this._comm.notifyShowHideLoader({ show: true });
		this._cmsService.getCMSBySlug(this.cmsSlug).subscribe(res=>{
			this._comm.notifyShowHideLoader({ show: false });
			if(res){
				var resp = res.body;
				resp['title'] = (resp['title']) ? resp['title'] : null;
				resp['description'] = (resp['description']) ? resp['description'] : null;
				this.cmsForm.patchValue(resp);
			}
		}, error => {
				this._comm.notifyShowHideLoader({ show: false });
				this._alrt.error('Error', this.translate.instant('errorMessage.Unable to fetch CMS detail'));
		});
	}

	hasError(field: any) {
		return CustomValidation.hasError(this.cmsForm, field);
	}

	updateCMS(){
		if(this.cmsForm.valid){
			const postData = JSON.parse(JSON.stringify(this.cmsForm.value));
			this._comm.notifyShowHideLoader({show: true});
			this._cmsService.editCMS(this.cmsSlug, postData).subscribe(res => {
				this._comm.notifyShowHideLoader({show: false});
				if(res['status'] == 200 ){
					this._alrt.success('Success', this.translate.instant('errorMessage.CMS Edit Successfully'));
					this.router.navigate(["/admin/cms/cms-list"]);
				}
			},error =>{
				this._comm.notifyShowHideLoader({ show: false });
				const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.CmsError');
			    this._alrt.error('Error', msg);
			});
		}
	}
}
