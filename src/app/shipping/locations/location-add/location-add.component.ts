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
import { shippingService } from '../locations.service';
import { TranslateService } from '@ngx-translate/core';
 
@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {
  matcher = new ValidationClassStateMatcher();
  locationAddForm: FormGroup;
  factoryUser_id: any;
  countryArray: any[];
  stateCountry: any=[];
  location_id: any;
  countries: any;
	states: any;
	cities:any;
	countryObject?: any;
	stateObject?: any; 
	cityObject: any;
  city_value: any;
  zip_code:any;
  city_id:any;
  constructor(private _shipping: shippingService,private fb: FormBuilder,public translate: TranslateService,
     private _comm: CommunicationService, private _alrt: AlertService, private router: Router, private route: ActivatedRoute)
   {
    this.formInIt();
    this.route.params.subscribe(params => {
      if (params && params.id) {
        setTimeout(() => {        
          this.location_id = params.id;
          if (this.location_id) {
            this.getLocationID();
          }
        })
      }
    });
    }

  ngOnInit(): void {
   this.getCountries();
  }
  formInIt() {
    this.locationAddForm = this.fb.group({
      city_id: ['', [Validators.required, CustomValidation.validateWhiteSpace, CustomValidation.validateNumberRequired,CustomValidation.validateNumberRequired]],
      zip_code: ['', [Validators.required, CustomValidation.validateWhiteSpace, CustomValidation.validateNumberRequired,CustomValidation.validateNumberRequired]],

      // category_level: ['', [Validators.required]],
      // id: ['', [Validators.required]],
    });
    // this.locationAddForm.controls.category_level.setValue('LEVEL_ONE');
    // this.categoryForm.controls.id.setValue(0);
  }
  hasError(field: any) {
    return CustomValidation.hasError(this.locationAddForm, field);
  }

  arrHasError(formObj: any, field: any) {
    return CustomValidation.hasError(formObj, field);
  }

  // getCategoryListData() {  
  //     // this._comm.notifyShowHideLoader({ show: true });
  //     this._shipping.getCategoryList().subscribe(res => {
  //       this._comm.notifyShowHideLoader({ show: false });
  //       if (res) {
  //         //var resp =[];
  //         var resp = res;
  //         this.peopleArray = Object.values(res)
  //         // resp['title'] = (resp['title']) ? resp['title'] : null;
  //         resp['commission'] = (resp['commission'] !== undefined) ? resp['commission'] : null;
  //         this.categoryForm.patchValue(resp);
         
  //       }
  //     }, error => {
  //       this._comm.notifyShowHideLoader({ show: false });
  //     });
    
  // }

  
  // getCategoryDetails() {
  //   if (this.factoryUser_id) {
  //      const postData = {category_id: this.categoryListData};
  //     const id =this.factoryUser_id;
  //     // const catetory_id =  this.categoryListData
  //     this._comm.notifyShowHideLoader({ show: true });
  //     this._shipping.getFactroyCommissionDetails(postData, id).subscribe(res => {
  //       this._comm.notifyShowHideLoader({ show: false });
  //       if (res) {
  //         var resp = res.body;
  //         resp['commission'] = (resp['commission'] !== undefined) ? resp['commission'] : null;
  //         this.categoryForm.patchValue(resp);
         
  //       }
  //     }, error => {
  //       this._comm.notifyShowHideLoader({ show: false });
  //     });
  //   }
  // }
  catetory_id(factoryUser_id: any, catetory_id: any) {
    throw new Error("Method not implemented.");
  }
  updateLocation() {
    if (this.locationAddForm.valid) {
      let locationData = {id:this.location_id, city_id:this.locationAddForm.value.city_id, zip_code:this.locationAddForm.value.zip_code};
			// const postData = JSON.parse(JSON.stringify(this.locationAddForm.value));
      //postData['id'] = this.location_id;
      const id = this.location_id;       
			this._comm.notifyShowHideLoader({ show: true });
			this._shipping.updateLocation(locationData, id).subscribe(res => {
				this._comm.notifyShowHideLoader({ show: false });
				const msg = (res && res['message']) ? res['message'] : this.translate.instant('errorMessage.locationUpdate');
    			this._alrt.success('Success', msg);
    			this.router.navigate(["/shipping/locations/location"]);
			}, error => {
				this._comm.notifyShowHideLoader({ show: false });
        const msg = (error &&  error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.locationErr');
        this._alrt.error('Error', msg);
			});
		}	
  }
 
  addLocation() {
    if (this.locationAddForm.valid) {
      const postData = JSON.parse(JSON.stringify(this.locationAddForm.value));
      this._comm.notifyShowHideLoader({ show: true });
      this._shipping.addLocation(postData).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (res && res['message']) ? res['message'] : this.translate.instant('errorMessage.locationSucc');
        this._alrt.success('Success', msg);
        this.router.navigate(["/shipping/locations/location"]);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.locationErr');

        this._alrt.error('Error', msg);
      });
    }
  }

  getCountries(){
		this._shipping.getCountries().subscribe(data =>{
			this.countries = data.body;
		},error=>{
			const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.locationCountry');
			this._alrt.error('Error', msg);
		});
	}
	
	onChangeCountry(country: any){
		let countryId = country.value;
		this._comm.notifyShowHideLoader({show: true});
		this._shipping.getStates(countryId).subscribe(data =>{
			this._comm.notifyShowHideLoader({show: false});
			this.states = data.body;
		},error=>{
			this._comm.notifyShowHideLoader({show: false});
			const msg = (error && error['error_description']) ? error['error_description'] :this.translate.instant('errorMessage.locationFetch');
			this._alrt.error('Error', msg);
		});
	}

	onStateChange(state: any){
		let stateId = state.value;
		this._comm.notifyShowHideLoader({show: true});
		this._shipping.getCities(stateId).subscribe(data =>{
			this._comm.notifyShowHideLoader({show: false});
			this.cities = data.body;
		},error=>{
			this._comm.notifyShowHideLoader({show: false});
			const msg = (error && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.locationState');
			this._alrt.error('Error', msg);
		});
	}

	onCityChange(city:any){
    this.city_value = city.value;
		
	}
  getLocationID(){
    const id = this.location_id;
		this._shipping.getLocationByID(id).subscribe(data =>{
      let resp = data.body;
      console.log("rsp", resp);
      if(data.body['city']!=null){
				this.countryObject = data.body['city']['state']['country'];
				this.stateObject = data.body['city']['state'];
        this.cityObject = data.body['city'];
        this.zip_code = data.body['zip_code'];
				this.selectCountryOnProfileData(this.countryObject.id, this.stateObject.id);
			}
		},error=>{
			const msg = (error && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.locationCountry');
			this._alrt.error('Error', msg);
		});
  }
  selectCountryOnProfileData(countryId: any, stateId: any){
		this._shipping.getStates(countryId).subscribe(data =>{
			this.states = data.body;
			this.selectStateOnProfileData(stateId);
		},error=>{
		});
  }
  selectStateOnProfileData(stateId: any){
		this._shipping.getCities(stateId).subscribe(data =>{			
			this.cities = data.body;
		},error=>{			
		});
	}

  resetForm(){
	
		this.locationAddForm.reset();
		this.states = [];
    this.cities = [];
    this.countries = [];
	
	}

}
