import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../_services/alert.service';
import { EnquiryService } from '../enquiry.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { Enquiry } from '../../../_models/enquiry';
import { CustomValidation } from '../../../_validators/custom-validation';
import { TranslateService } from '@ngx-translate/core';
 @Component({
	selector: 'app-enquiry-detail',
	templateUrl: './enquiry-detail.component.html',
	styleUrls: ['./enquiry-detail.component.css']
})
export class EnquiryDetailComponent implements OnInit {

	enquiryId: any;
	enquiryObj: Enquiry;
	replyForm: FormGroup;
	disabled: boolean = false;
	constructor(private _enquiryService: EnquiryService,public translate: TranslateService,
		private _comm: CommunicationService, 
				private router: Router, private route: ActivatedRoute, private alert: AlertService, private fb: FormBuilder) {
		this.route.params.subscribe(param =>{
			if(param.id && param){
				this.enquiryId = param.id;
				if(this.enquiryId){
					this.getEnquiryDetail();
					this.formInit();
				}
			}else{
				this.formInit();
			}
		});
	}

	ngOnInit(): void {
		
	}

	formInit(){
		this.replyForm = this.fb.group({
			id:[''],
			reply: [{value:'', disabled: this.disabled}, [ Validators.required, Validators.minLength(3), Validators.maxLength(255) ]]
		});
	}

	hasError(field: any) {
		return CustomValidation.hasError(this.replyForm, field);
	}

	getEnquiryDetail(){
		console.log("getEnquiryDetail()");
		this._comm.notifyShowHideLoader({ show: true });
		this._enquiryService.getEnquiryDetail(this.enquiryId).subscribe(res=>{
			let resp = res.body;
			if(res.body['replied_message'] != null){
				console.log("this.disabled = true;");
				this.disabled = true;
				this.replyForm.get('reply').disable();
			}
			if(res.status == 200){
				this.enquiryObj = JSON.parse(JSON.stringify(res.body));
				resp['id'] = res.body['id'];
				resp['reply'] = res.body['replied_message'];
				this.replyForm.patchValue(resp);
				this._comm.notifyShowHideLoader({ show: false });
			}
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
			this.alert.error('error', this.translate.instant('errorMessage.enquiryErr'));
		});
		
	}

	submitReply(){
		console.log("submitReply()");
		if(this.replyForm.valid){
			this._enquiryService.giveEnquiryReply(this.replyForm).subscribe(res=>{
				if(res.status == 200){
					this.getEnquiryDetail();
					this.alert.success('Success', this.translate.instant('errorMessage.repliedSucc'));
					this.router.navigate(['/admin/enquiry/enquiry-list/']);	
				}
			}, error=>{
				this.alert.error('error', this.translate.instant('errorMessage.enquiryErr'));
			});
		}
	}

}
