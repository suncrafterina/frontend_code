import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidation } from '../../../_validators/custom-validation';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { FaqService } from '../faq.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
	selector: 'app-faq-create',
	templateUrl: './faq-create.component.html',
	styleUrls: ['./faq-create.component.scss']
})
export class FaqCreateComponent implements OnInit {

	matcher = new ValidationClassStateMatcher();
	faqForm: FormGroup;
	faqId: any;
	faqPageTitle: string;
	subFaqPageTitle: string;
	constructor(private fb: FormBuilder, private _faqService: FaqService,public translate: TranslateService, private router: Router, private _comm: CommunicationService, private _alrt: AlertService, private route: ActivatedRoute) {
		this.formInIt();
		this.route.params.subscribe(param =>{
			if(param.id && param){
				this.faqId = param.id;
				if(this.faqId){
					this.faqPageTitle = this.translate.instant("Common.edit");
					this.subFaqPageTitle = this.translate.instant("Common.FAQ");
					this.getFAQDetail();
				}
			}else{
				this.faqPageTitle = this.translate.instant("Common.add");
				this.subFaqPageTitle = this.translate.instant("Common.new");
			}
		});
	}

	ngOnInit(): void {
		// this.formInIt();
	}

	formInIt() {
		this.faqForm = this.fb.group({
			title: ['', [Validators.required, CustomValidation.validateWhiteSpace, Validators.minLength(3), Validators.maxLength(255)]],
			answer: ['', [Validators.required, CustomValidation.validateWhiteSpace, Validators.minLength(3), Validators.maxLength(255)]], 
		});
	}

	getFAQDetail(){
		console.log("getFAQDetail()");
		this._comm.notifyShowHideLoader({ show: true });
		this._faqService.getFAQDetail(this.faqId).subscribe(res=>{
			this._comm.notifyShowHideLoader({ show: false });
			if(res){
				console.log(res);
				var resp = res.body;
				resp['title'] = (resp['title']) ? resp['title'] : null;
				resp['answer'] = (resp['answer']) ? resp['answer'] : null;
				this.faqForm.patchValue(resp);
			}
		}, error => {
				this._comm.notifyShowHideLoader({ show: false });
		});
	}

	hasError(field: any) {
		return CustomValidation.hasError(this.faqForm, field);
	}

	addFAQ() {

		if (this.faqForm.valid) {
			const postData = JSON.parse(JSON.stringify(this.faqForm.value));
			this._comm.notifyShowHideLoader({ show: true });
			this._faqService.addFAQ(postData).subscribe(res => {
			    this._comm.notifyShowHideLoader({ show: false });
			    const msg =this.translate.instant("errorMessage.FAQ added successfully");
			    this._alrt.success('Success', msg);
				this.router.navigate(["/admin/faq/faq-list"]);
			}, error => {
				this._comm.notifyShowHideLoader({ show: false });
				const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.FAQError');
			    this._alrt.error('Error', msg);
			});
		}

	} 
	
	updateFAQ(){
		if(this.faqForm.valid){
			const postData = JSON.parse(JSON.stringify(this.faqForm.value));
			this._comm.notifyShowHideLoader({show: true});
			this._faqService.editFAQ(this.faqId, postData).subscribe(res => {
				this._comm.notifyShowHideLoader({show: false});
				if(res['title']!= "Not Found" ){
					this._alrt.success('Success', this.translate.instant("errorMessage.FAQ edited successfully"));
					this.router.navigate(["/admin/faq/faq-list"]);
				}
			},error =>{
				this._comm.notifyShowHideLoader({ show: false });
				const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.FAQError');
			    this._alrt.error('Error', msg);
			});
		}
		console.log(this.faqId);
	}
}
