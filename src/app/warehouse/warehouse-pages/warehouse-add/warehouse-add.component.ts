import { Input, Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Amenities } from '../../common-features/amenities';
import { Years } from '../../common-features/years';
import { CustomValidation } from '../../../_validators/custom-validation';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { ProfileService } from '../../profile/profile.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { WarehouseService } from '../warehouse.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
	selector: 'app-warehouse-add',
	templateUrl: './warehouse-add.component.html',
	styleUrls: ['./warehouse-add.component.css']
})

export class WarehouseAddComponent implements OnInit {

	@ViewChild('file') myImage: ElementRef;

	imgPreview: SafeResourceUrl;
	imageError = null;
	uploadFileName: any;
	maxHeightWidth = 800;
	minHeightWidth = 100;
	selectFile = null;
	images = []; 
	imgArr = [];
	imgSubmitted = false;
	isFavourite = [];
	selected: any = [];
	matcher = new ValidationClassStateMatcher();
	warehouseForm: FormGroup;
	amenities = JSON.parse(JSON.stringify(Amenities));
	years = Years;

	@Input() disabled = false;

	checkArray: FormArray;

	pageTitle: any;
	warehouseId: any;
	countries: any;
	states: any;
	cities:any;
	countryObject?: any;
	stateObject?: any; 
	cityObject: any;
	buildYearObject: any = { id : undefined};
	disabledObjects:any = { city: {}, warehouse_size: 0, available_space: 0, build_year: 0, zip_code: 0, address_line_1:'', address_line_2:''};

	constructor(private fb: FormBuilder, private profileService: ProfileService, private _comm: CommunicationService, 
				private alert: AlertService, public sanitizer: DomSanitizer, private warehouseService: WarehouseService, 
				private router: Router,public translate: TranslateService, private route: ActivatedRoute) { }

	ngOnInit(): void {
		
		this.route.params.subscribe(param=>{
			if(param && param.id){
				this.pageTitle = "edit";
				this.warehouseId = param.id;
				// this.checkArray = this.warehouseForm.get('amenities_facilities') as FormArray;
				this.disabled = true;
				this.getWarehouseById(param.id);
			}else{
				this.pageTitle = "add";
				// this.checkArray = this.warehouseForm.get('amenities_facilities') as FormArray;
			}
		});
		this.formInit();
		this.checkArray = this.warehouseForm.get('amenities_facilities') as FormArray;
	}

	formInit(){
		this.warehouseForm = this.fb.group({
			warehouse_code: [{ value: '', disabled: this.disabled }],
			warehouse_name: ['', [ CustomValidation.validateWhiteSpace, Validators.required, Validators.minLength(2), Validators.maxLength(255) ]],
			description: ['', [ CustomValidation.validateWhiteSpace, Validators.required, Validators.minLength(3), Validators.maxLength(1000) ]],
			email_address: ['', [ Validators.required, CustomValidation.validateEmail ]],
			phone_number: ['', [ Validators.minLength(10), Validators.maxLength(15), CustomValidation.validatePhoneNumber ]],
			address_line_1: [{ value: '', disabled: this.disabled }, [ CustomValidation.validateWhiteSpace, Validators.required, Validators.minLength(3), Validators.maxLength(255) ]],
			address_line_2: [{ value: '', disabled: this.disabled } , [ Validators.minLength(3), Validators.maxLength(255) ]],
			zip_code: [{ value: '', disabled: this.disabled }, [ Validators.required, CustomValidation.validateZipCode, Validators.minLength(3), Validators.maxLength(6) ]],
			warehouse_size: [{ value: '', disabled: this.disabled }, [ CustomValidation.validateNumber, Validators.required ]],
			available_space: [{ value: '', disabled: this.disabled }, [ CustomValidation.validateNumber, Validators.required ]],
			country: [{ value: '', disabled: this.disabled }, [ Validators.required ]],
			state: [{ value: '', disabled: this.disabled }, [ Validators.required ]],
			city: [{ value: '', disabled: this.disabled }, [ Validators.required ]],
			build_year: [{ value: '', disabled: this.disabled }, [ Validators.required ]],
			amenities_facilities: this.fb.array([],),
			image_url: [''],
			warehouse_images: ['', [Validators.required]],
			is_favourite: ['']
		});
		this.getCountries();
	}

	resetForm(){
		let i: number = 0;
		this.amenities.forEach(item => {
			item.is_checked = false;//change as per your requirement
		});
		
		this.warehouseForm.reset();
		this.states = [];
		this.cities = [];
		this.images = [];
		this.imgArr = [];
		this.checkArray.controls.forEach((item: FormControl) => {
			i++;
		});
	}

	selectCountryOnProfileData(countryId: any, stateId: any){
		this.profileService.getStates(countryId).subscribe(data =>{
			this.states = data.body;
			this.selectStateOnProfileData(stateId);
		},error=>{
		});
	}

	selectStateOnProfileData(stateId: any){
		this.profileService.getCities(stateId).subscribe(data =>{			
			this.cities = data.body;
		},error=>{			
		});
	}

	onCheckCondition(key : any){
		let arrTemp = [];
		if(this.checkArray != undefined && this.checkArray.value[0] != null){
			for(let i=0; i < this.checkArray.value.length; i++){
				arrTemp.push(this.checkArray.value[i].amenities_facilities);
			}
			if(arrTemp.includes(key)){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}

	getWarehouseById(id: any){
		this._comm.notifyShowHideLoader({ show:true });
		this.warehouseService.getWarehouseDetail(id).subscribe(data=>{
			
			let resp = data.body;
			if(data.body['city']!=null){
				this.countryObject = data.body['city']['state']['country'];
				this.stateObject = data.body['city']['state'];
				this.cityObject = data.body['city'];
				this.selectCountryOnProfileData(this.countryObject.id, this.stateObject.id);
			}
			if(data.body['build_year']){
				this.buildYearObject.id = data.body['build_year'];
			}
			if(data.body['warehouse_images']){
				for(let i=0;i<data.body['warehouse_images'].length;i++){
					this.images.push(data.body['warehouse_images'][i]['image_file']);
					this.imgArr.push(data.body['warehouse_images'][i]);
					resp['is_favourite'] = data.body['warehouse_images'][i]['is_favourite'];
					this.isFavourite.push(data.body['warehouse_images'][i]['is_favourite']);
				}
			}
			if(data.body['amenities_facilities']){
				for(let i=0; i < data.body['amenities_facilities'].length;i++){
					this.checkArray.push(new FormControl(data.body['amenities_facilities'][i]['amenities_facilities']));
					for(let j =0; j<this.amenities.length;j++){
						if(this.amenities[j].key == data.body['amenities_facilities'][i]['amenities_facilities']){
							this.amenities[j].is_checked = true;
							break;
						}
					}
				}
			}
			resp['warehouse_code'] = data.body['warehouse_code'];
			resp['warehouse_name'] = data.body['warehouse_name'];
			resp['description'] = data.body['description'];
			resp['email_address'] = data.body['email_address'];
			resp['phone_number'] = data.body['phone_number'];
			resp['address_line_1'] = data.body['address_line_1'];
			resp['address_line_2'] = data.body['address_line_2'];
			resp['zip_code'] = data.body['zip_code'];
			resp['warehouse_size'] = data.body['warehouse_size'];
			resp['available_space'] = data.body['available_space'];
			resp['build_year'] = data.body['build_year'];
			resp['image_url'] = data.body['image_url'];
			resp['warehouse_images'] = data.body['warehouse_images'];
			this.disabledObjects.address_line_1 = data.body['address_line_1'];
			this.disabledObjects.address_line_2 = data.body['address_line_2'];
			this.disabledObjects.city = data.body['city'];
			this.disabledObjects.warehouse_size = data.body['warehouse_size'];
			this.disabledObjects.available_space = data.body['available_space'];
			this.disabledObjects.build_year = data.body['build_year'];
			this.disabledObjects.zip_code = data.body['zip_code'];
			this.warehouseForm.patchValue(resp);
			this._comm.notifyShowHideLoader({ show: false });
		}, error=>{
			this._comm.notifyShowHideLoader({ show: false });
			const msg = (error && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.fetchData');
			this.alert.error('Error', msg);
		});
	}

	getCountries(){
		this.profileService.getCountries().subscribe(data =>{
			this.countries = data.body;
		},error=>{
			const msg = (error && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.locationCountry');
			this.alert.error('Error', msg);
		});
	}
	
	onChangeCountry(country: any){
		let countryId = country.value;
		this._comm.notifyShowHideLoader({show: true});
		this.profileService.getStates(countryId).subscribe(data =>{
			this._comm.notifyShowHideLoader({show: false});
			this.states = data.body;
		},error=>{
			this._comm.notifyShowHideLoader({show: false});
			const msg = (error && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.locationCountry');
			this.alert.error('Error', msg);
		});
	}

	onStateChange(state: any){
		let stateId = state.value;
		this._comm.notifyShowHideLoader({show: true});
		this.profileService.getCities(stateId).subscribe(data =>{
			this._comm.notifyShowHideLoader({show: false});
			this.cities = data.body;
		},error=>{
			this._comm.notifyShowHideLoader({show: false});
			const msg = (error && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.locationState');
			this.alert.error('Error', msg);
		});
	}

	onCityChange(event:any){
	
	}

	onCheckboxChange(event:any, index: any){
		this.amenities[index].is_checked = event.checked;
		if (event.checked) {
			this.checkArray.push(new FormControl(event.source.value));
		} else {
			let i: number = 0;
			this.checkArray.controls.forEach((item: FormControl) => {
				let typeVar: any = typeof(item.value);
				if(typeVar == 'object'){
					if (item.value.amenities_facilities == event.source.value) {
						this.checkArray.removeAt(i);
						return;
					}
				}else{
					if (item.value == event.source.value) {
						this.checkArray.removeAt(i);
						return;
					}
				}
				i++;
			});
		}
	}

	hasError(field: any){
		return CustomValidation.hasError(this.warehouseForm, field);
	}

	favroiteImage(index: any){
		let lengthImgArr = this.imgArr.length;
		if(this.warehouseId){			
			this._comm.notifyShowHideLoader({ show: true });
			for(let i = 0; i < lengthImgArr; i++){
				let imgId = this.imgArr[i].id;
				if(i == index){
					this.warehouseService.isFavoriteImageById(imgId, true).subscribe(data =>{
						if(i == (lengthImgArr - 1)){
							this._comm.notifyShowHideLoader({ show: false });
						}
						if(data.status == 200){
							this.isFavourite[i] = true;
							this.alert.success('Success', data.body['message']);		
						}
					});
				}else{					
					this.warehouseService.isFavoriteImageById(imgId, false).subscribe(data =>{		
						if(i == (lengthImgArr - 1)){
							this._comm.notifyShowHideLoader({ show: false });
						}
						if(data.status == 200){
							this.isFavourite[i] = false;		
							this.alert.success('Success', data.body['message']);
						}
					});
				}		
			}
			this.warehouseForm.patchValue({
				is_favourite: this.isFavourite
			});
		}else{
			for(let i=0; i < this.isFavourite.length; i++){
				if( i == index){
					this.isFavourite[i] = true;
				}else{
					this.isFavourite[i] = false;
				}
			}
			this.warehouseForm.patchValue({
				is_favourite: this.isFavourite
			});
		}
	}

	removeImage(index: any){
		if(this.warehouseId){
			let imgId = this.imgArr[index].id;
			this._comm.notifyShowHideLoader({ show: true });
			this.warehouseService.removeImageByID(imgId).subscribe(data =>{
				this._comm.notifyShowHideLoader({ show:false });
				if(data.status == 200){
					this.imgArr.splice(index, 1);
					this.images.splice(index, 1);
					this.warehouseForm.patchValue({
						warehouse_images: this.imgArr
					});			
					this.alert.success('Success', data.body['message']);
				}
			}, error => {
				this._comm.notifyShowHideLoader({ show:false });
				const msg = (error && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.locationImageRemoval');
				this.alert.error('Error', msg);
			});
		}else{
			this.imgArr.splice(index, 1);
			this.images.splice(index, 1);
			if(this.imgArr.length > 0){
				this.warehouseForm.patchValue({
					warehouse_images: this.imgArr
				});
			}else{
				
				this.warehouseForm.patchValue({
					warehouse_images: ''
				});
			}	
		}
	}

	fileChange(event:any){
		this.imageError = null;
		var allowedImages = 'jpg,jpeg,png';
		var fileSizeLimit = 2097152; // 2MB
		if (event.target.files[0]) {
			const file = event.target.files[0];
			const ext = file.type.split('/').pop();
			let status = true;
			// Check image file is valid or not
			if (allowedImages.indexOf(ext) === -1) {
				status = false;
				this.imageError = this.translate.instant('errorMessage.invalidFile');
			}
			// Check Size of file is valid or not
			if (file.size > fileSizeLimit) {
				status = false;
				this.imageError = this.translate.instant('errorMessage.fileSize');
			}
			if (status) {
				var filesAmount = event.target.files.length;
				for (let i = 0; i < filesAmount; i++) {
					var reader = new FileReader();
					let that = this;			
					reader.onload = (event1:any) => {
						let img = new Image();
						img.src = reader.result as string;
						img.onload = () => {
							const height = img.naturalHeight;
							const width = img.naturalWidth;
							if (img.naturalWidth > that.maxHeightWidth || img.naturalHeight > that.maxHeightWidth || img.naturalHeight < that.minHeightWidth || img.naturalWidth < that.minHeightWidth) {
								this.imageError = that.imageError = this.translate.instant('errorMessage.warehouseCreate');
							}else{
								this.imgArr.push(event.target.files[i]);
								this.isFavourite.push(false);
								this.images.push(event1.target.result);
								this.warehouseForm.patchValue({
									warehouse_images: this.imgArr,
									is_favourite: this.isFavourite
								});
							}
						}
					}
					reader.readAsDataURL(event.target.files[i]);
				}
			}
		} else {
			this.imageError = this.translate.instant('errorMessage.PleaseSelectImage');
		}
	}

	submitWarehouse(){
		this.imgSubmitted = true;
		
		if(this.warehouseForm.valid){
			this._comm.notifyShowHideLoader({show: true});
			this.warehouseService.addWarehouse(this.warehouseForm).subscribe(data=>{
				this._comm.notifyShowHideLoader({show: false});
				if(data['status'] == 200){
					this.alert.success('Success', data['message']);
					this.router.navigate(["/warehouse/warehouse-pages"]);
				}
			},error=>{
				this._comm.notifyShowHideLoader({show: false});
				const msg = (error && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.warehouseCreate');
				this.alert.error('Error', msg);
			});
		}
	}

	editWarehouse(id:any){
		this.imgSubmitted = true;
		if(this.warehouseForm.valid){
			this._comm.notifyShowHideLoader({show:true});
			this.warehouseService.editWareHouse(this.warehouseForm, id, this.disabledObjects).subscribe(data=>{
				if(data['status'] == 200){
					this._comm.notifyShowHideLoader({ show:false });
					this.alert.success('Success', data['message']);
					this.router.navigate(["/warehouse/warehouse-pages"]);
				}
			},error=>{
				this._comm.notifyShowHideLoader({ show:false });
				const msg = (error && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.warehouseUpdate');
				this.alert.error('Error', msg);
			});
		}
	}
}
