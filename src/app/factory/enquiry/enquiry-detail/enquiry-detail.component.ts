import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../_services/alert.service';
import { EnquiryService } from '../enquiry.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { Enquiry } from '../../../_models/enquiry';
import { CustomValidation } from '../../../_validators/custom-validation';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../../_services/message.service';
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
	constructor(private _enquiryService: EnquiryService, private _comm: CommunicationService, 
				private router: Router, private route: ActivatedRoute, private alert: AlertService, 
				private fb: FormBuilder, public translate: TranslateService,private _messageService: MessageService) {
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
		this._messageService.changeMessage('enquiry');
		this.replyForm = this.fb.group({
			id:[''],
			reply: [{value:'', disabled: this.disabled}, [ Validators.required, Validators.minLength(3), Validators.maxLength(255) ]]
		});
	}

	hasError(field: any) {
		return CustomValidation.hasError(this.replyForm, field);
	}

	getEnquiryDetail(){
		this._comm.notifyShowHideLoader({ show: true });
		this._enquiryService.getEnquiryDetail(this.enquiryId).subscribe(res=>{
			let resp = res.body;
			if(res.body['replied_message'] != null){
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
			const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.errorEnquiryDetailFetching');
    		this.alert.error('Error', msg);
		});
		
	}

	submitReply(){
		if(this.replyForm.valid){
			this._enquiryService.giveEnquiryReply(this.replyForm).subscribe(res=>{
				if(res.status == 200){
					this.getEnquiryDetail();
					this.alert.success('Success', this.translate.instant('errorMessage.enquiryRepliedSuccessfully'));
					this.router.navigate(['/factory/enquiry/enquiry-list/']);	
				}
			}, error=>{
				const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.errorEnquiryDetailReply');
				this.alert.error('Error', msg);
		
			});
		}
	}
	

}
