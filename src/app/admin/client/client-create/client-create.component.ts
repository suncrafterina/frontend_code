import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidation } from '../../../_validators/custom-validation';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { ClientService } from '../client.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { debounceTime, delay, tap, filter, map, takeUntil } from 'rxjs/operators';
@Component({
	selector: 'app-client-create',
	templateUrl: './client-create.component.html',
	styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {

	clientForm: FormGroup;
	Id: any;
	pageTitle: string;
	subPageTitle: string;
	maxHeightWidth = 800;
	minHeightWidth = 100;
	imgPreview: SafeResourceUrl;
	imageError = null;
	existImage = null;
	uploadFileName: any;
	selectFile = null;
	imageText = "AddImage";

	constructor(private fb: FormBuilder, public translate: TranslateService, public sanitizer: DomSanitizer, private _client: ClientService, private router: Router, private _comm: CommunicationService, private _alrt: AlertService, private route: ActivatedRoute) {
		this.formInIt();
		this.route.params.subscribe(param => {
			if (param.id && param) {
				this.Id = param.id;
				if (this.Id) {
					this.pageTitle = this.translate.instant('Common.edit');
					this.subPageTitle = this.translate.instant('Common.client');
					this.getDetail();
				}
			} else {
				this.pageTitle = this.translate.instant('Common.add');
				this.subPageTitle = this.translate.instant('Common.new');
			}
		});
	}
	ngOnInit(): void {
		if (!this.Id) {
			this.clientForm.get('image_file').setValidators([Validators.required]);
		}

	}
	formInIt() {
		this.clientForm = this.fb.group({
			title: ['', [Validators.required, CustomValidation.validateWhiteSpace, Validators.minLength(3), Validators.maxLength(255)]],
			image_file: [''],
		});
	}
	getDetail() {
		this._comm.notifyShowHideLoader({ show: true });
		this._client.getClientDetail(this.Id).subscribe(res => {
			this._comm.notifyShowHideLoader({ show: false });
			if (res) {
				var resp = res.body;
				resp['title'] = (resp['title']) ? resp['title'] : null;
				this.imgPreview = resp['image_file_thumb'];
				this.clientForm.patchValue(resp);
				this.imageText = "ChangeImage";
			}
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
		});
	}

	hasError(field: any) {
		return CustomValidation.hasError(this.clientForm, field);
	}
	add() {
		if (this.clientForm.valid) {
			const postData = JSON.parse(JSON.stringify(this.clientForm.value));
			this._comm.notifyShowHideLoader({ show: true });
			this._client.addClient(postData, this.selectFile).subscribe(res => {
				this._comm.notifyShowHideLoader({ show: false });
				const msg = this.translate.instant('errorMessage.clientAdd');
				this._alrt.success('Success', msg);
				this.router.navigate(["/admin/client"]);
			}, error => {
				this._comm.notifyShowHideLoader({ show: false });
				const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.clientError');
				this._alrt.error('Error', msg);
			});
		}
	}
	update() {
		if (this.clientForm.valid) {
			const postData = JSON.parse(JSON.stringify(this.clientForm.value));
			this._comm.notifyShowHideLoader({ show: true });
			this._client.editClient(this.Id, postData, this.selectFile).subscribe(res => {
				this._comm.notifyShowHideLoader({ show: false });
				if (res['title'] != "Not Found") {
					const msg = this.translate.instant('errorMessage.clientEdit');
					this._alrt.success('Success', msg);
					this.router.navigate(["/admin/client"]);
				}
			}, error => {
				this._comm.notifyShowHideLoader({ show: false });
				const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.clientErrorEdit');
				this._alrt.error('Error', msg);
			});
		}

	}
	fileChange(event) {
		this.imageError = null;
		var allowedImages = 'jpg,jpeg,png';
		var fileSizeLimit = 2097152; // 2MB
		if (event.target.files[0]) {
			const file = event.target.files[0];
			const ext = file.type.split('/').pop();
			let status = true;
			if (allowedImages.indexOf(ext) === -1) {
				status = false;
				this.imageError = this.translate.instant('errorMessage.invalidFile');
			}
			if (file.size > fileSizeLimit) {
				status = false;
				this.imageError = this.translate.instant('errorMessage.fileSize');
			}
			if (status) {
				this.uploadFileName = new Date().getTime() + '_' + file.name.replace(/[^A-Z0-9.]/gi, '');
				/*if (this.profileForm.value['profileImage']) {
				  this.uploadFileName = this.profileForm.value['profileImage'].split('/').pop();
				}*/
				this._comm.notifyShowHideLoader({ show: true });
				/* image diemension validation */
				var bannerImage = new Image();
				bannerImage.src = window.URL.createObjectURL(file);
				const that = this;
				bannerImage.onload = function () {
					if (bannerImage.naturalWidth > that.maxHeightWidth || bannerImage.naturalHeight > that.maxHeightWidth || bannerImage.naturalHeight < that.minHeightWidth || bannerImage.naturalWidth < that.minHeightWidth) {
						that._comm.notifyShowHideLoader({ show: false });
						that.imageError = that.translate.instant('errorMessage.ImageDimension');
						that.clientForm.get('icon_file').setValidators([Validators.required]);
						return;
					} else {
						that._comm.notifyShowHideLoader({ show: false });
						that.selectFile = file;
						that.imgPreview = that.sanitizer.bypassSecurityTrustResourceUrl(
							bannerImage.src
						);
						that.imageText = "ChangeImage";

					}
				}
			}
		} else {
			this.imageError = this.translate.instant('errorMessage.PleaseSelectImage');
		}
	}

}
