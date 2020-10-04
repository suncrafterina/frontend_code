import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidation } from '../../../_validators/custom-validation';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { BannerService } from '../banner.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { debounceTime, delay, tap, filter, map, takeUntil } from 'rxjs/operators';
import { MessageService } from '../../../_services/message.service';
@Component({
	selector: 'app-banner-create',
	templateUrl: './banner-create.component.html',
	styleUrls: ['./banner-create.component.scss']
})
export class BannerCreateComponent implements OnInit {
	BannerForm: FormGroup;
	Id: any;
	pageTitle: string;
	subPageTitle: string;
	maxHeightWidth = 2000;
	minHeightWidth = 600;
	imgPreview: SafeResourceUrl;
	imageError = null;
	existImage = null;
	uploadFileName: any;
	selectFile = null;
	imageText = "AddImage";
	bannerTypeArr = [{ 'key': 'CATEGORY', 'value': "Category" }, { 'key': 'PRODUCT', 'value': "Product" }];
	bannerType:any = [];
	bannerTypeSelect = '';
	public bannerFilteringCtrl: FormControl = new FormControl();
	public searching = false;
	constructor(private fb: FormBuilder, public translate: TranslateService,private _messageService: MessageService, public sanitizer: DomSanitizer, private _banner: BannerService, private router: Router, private _comm: CommunicationService, private _alrt: AlertService, private route: ActivatedRoute) {
		this.formInIt();
		this._messageService.changeMessage(this.translate.instant('Common.banner'));
		this.route.params.subscribe(param => {
			if (param.id && param) {
				this.Id = param.id;
				if (this.Id) {
					this.pageTitle = this.translate.instant('Common.edit');
					this.subPageTitle = this.translate.instant('Common.banner');
					this.getDetail();
				}
			} else {
				this.pageTitle = this.translate.instant('Common.add');
				this.subPageTitle = this.translate.instant('Common.new');
			}
		});
	}

	ngOnInit(): void {
		this.bannerFilteringCtrl.valueChanges
			.pipe(
				filter(search => !!search),
				map(search => {
					search = search.trim();
					let searchCount = 0;
					searchCount = search.trim().length;
					if ((searchCount > 3) || (searchCount == 0)) {
						tap(() => this.searching = true),
						debounceTime(200),
						this._banner.getBannerSearch(search,this.bannerTypeSelect).subscribe(res => {
							if (res) {
								var resp = res;
								this.bannerType = resp;
							}
						}, error => {
						});
					}
					
				}),
				delay(500),
				
			)
			.subscribe(filteredBanks => {
				this.searching = false;
				//this.filteredServerSideBanks.next(filteredBanks);
			},
				error => {
					// no errors in our simulated example
					this.searching = false;
					// handle error...
				});

				if(!this.Id)
				{
					this.BannerForm.get('image_file').setValidators([Validators.required]);
				}
}
formInIt() {
	this.BannerForm = this.fb.group({
		banner_type: ['', [Validators.required]],
		type_id: ['', [Validators.required]],
		image_file: [''],

	});
}
getDetail() {
	this._comm.notifyShowHideLoader({ show: true });
	this._banner.getBannerDetail(this.Id).subscribe(res => {
		this._comm.notifyShowHideLoader({ show: false });
		var resp = res.body;
		if (resp) {
			this.bannerTypeSelect = resp['banner_type'];
			this.imgPreview = resp['image_ur_thumb'];
			this.bannerType = [{'id':resp['type_id'],'name':resp['name']}]
			this.BannerForm.patchValue(resp);
			this.imageText = "ChangeImage";
		}
	}, error => {
		this._comm.notifyShowHideLoader({ show: false });
	});
}

hasError(field: any) {
	return CustomValidation.hasError(this.BannerForm, field);
}

add() {

	if (this.BannerForm.valid) {
		const postData = JSON.parse(JSON.stringify(this.BannerForm.value));
		this._comm.notifyShowHideLoader({ show: true });
		this._banner.addBanner(postData,this.selectFile).subscribe(res => {
			this._comm.notifyShowHideLoader({ show: false });
			const msg = this.translate.instant('errorMessage.bannerAdd');
			this._alrt.success('Success', msg);
			this.router.navigate(["/admin/banner"]);
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
			const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.bannerError');
			this._alrt.error('Error', msg);
		});
	}

}

update() {
	if (this.BannerForm.valid) {
		const postData = JSON.parse(JSON.stringify(this.BannerForm.value));
		this._comm.notifyShowHideLoader({ show: true });
		this._banner.editBanner(this.Id, postData,this.selectFile).subscribe(res => {
			this._comm.notifyShowHideLoader({ show: false });
			if (res['title'] != "Not Found") {
				const msg = this.translate.instant('errorMessage.bannerEdit');
				this._alrt.success('Success', msg);
				this.router.navigate(["/admin/banner"]);
			}
		}, error => {
			this._comm.notifyShowHideLoader({ show: false });
			const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.bannerErrorEdit');
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
					that.imageError = that.translate.instant('errorMessage.BannerImageDimension');
					that.BannerForm.get('icon_file').setValidators([Validators.required]);
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
selectBanner(event)
{
	if(event)
	{
		this.bannerType = [];
		this.bannerTypeSelect = event.value;
	}
}


}
