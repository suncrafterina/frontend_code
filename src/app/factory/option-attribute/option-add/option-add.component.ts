import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../_services/alert.service';
import { CommunicationService } from '../../../_services/communication.service'
import { OptionService } from '../option.service';
import { MatTableDataSource } from '@angular/material/table';
import { AlertMatDialogComponent } from '../../mat-components/mat-dialog/alert-mat-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidation } from '../../../_validators/custom-validation';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
 
export interface Option {
	name: string;
}

@Component({
	selector: 'app-option-add',
	templateUrl: './option-add.component.html',
	styleUrls: ['./option-add.component.css']
})

export class OptionAddComponent implements OnInit {
	
	// Chip-Lis variables
	visible = true;
	selectable = true;
	removable = true;
	addOnBlur = true;
	readonly separatorKeysCodes: number[] = [ ENTER, COMMA];
	options: any[] = [
	];

	categories: any;
	subCategories: any;
	dataList : any;
	dataEmpty = true;
	dataSource = new MatTableDataSource();
	displayedColumns: string[] = ['type', 'title', 'values', 'action'];
	sortField = 'entity_title,ASC';
	sortOrder = 'ASC';
	subCategoryModel: any;
	showAddNew = false;

	optionForm: FormGroup;
	subCategoryObject: any = {id: 0};

	constructor(private fb: FormBuilder, private router: Router,public translate: TranslateService, private optionService:OptionService, private _comm: CommunicationService, private alert: AlertService, public dialog: MatDialog) { }

	ngOnInit(): void {
		this.getCategories();
		this.formInit();
	}

	formInit(){
		this.optionForm = this.fb.group({
			category: [''],
			subCategory: [''],
			type: ['', [ Validators.required ]],
			title: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(255) ]],
			value: [[], [  Validators.required ]]
		});
	}

	resetForm(){
		console.log(this.optionForm);
		this.dataSource.data = [];
		this.dataEmpty = true;
		this.optionForm.reset;
		this.options.length = 0;
		this.subCategoryObject.id = undefined;
		this.subCategories = [];
		this.showAddNew = false;
		this.optionForm.get('category').setValue(null);
		this.optionForm.get('type').setValue('');
		this.optionForm.get('title').setValue('');
		this.optionForm.get('value').setValue('');
	}

	showAddNewMethod(){
		let subCategoryValue = this.optionForm.get('subCategory').value;
		if(subCategoryValue != undefined && subCategoryValue > 0){
			this.showAddNew = !(this.showAddNew);
		}else{
			this.alert.info('Information', this.translate.instant('errorMessage.info'));
		}
	}

	onSubmit(){
		if(this.optionForm.valid){
			let subCat = this.optionForm.get('subCategory').value;
			let type = this.optionForm.get('type').value;
			let title = this.optionForm.get('title').value;
			let value = this.optionForm.get('value').value;
			let values = value;
			let obj = {
				type: type,
				title: title,
				values: values,
				category_id: subCat
			};
			let finalObj = JSON.parse(JSON.stringify(obj));
			console.log(finalObj);
			this._comm.notifyShowHideLoader({ show: true});
			this.optionService.addAttribute(obj).subscribe(res=>{
				if(res.status == 200){
					this._comm.notifyShowHideLoader({ show: false});
					this.alert.success('Success', this.translate.instant('errorMessage.RequestSucc'));
					this.router.navigate(['/factory/option']);
				}
			},error=>{
				this._comm.notifyShowHideLoader({ show: false});
				this.alert.error('Error', this.translate.instant('errorMessage.RequestErr'));
			});
		}	
	}

	hasError(field: any) {
		return CustomValidation.hasError(this.optionForm, field);
	}

	getOptionsById(event: any){
		console.log(this.optionForm.value);
		this.subCategoryObject.id = event.value;
		this._comm.notifyShowHideLoader({ show: true });
		this.optionService.getOptionsListById(event.value).subscribe(data =>{
			this.dataList = data.body;
			console.log(this.optionForm.value);
			this._comm.notifyShowHideLoader({ show: false });
			if(this.dataList.length > 0){
				this.dataSource.data = this.dataList;
				this.dataEmpty = false;
			}else{
				this.dataSource.data = this.dataList;
				this.dataEmpty = true;
			}
		},error=>{
			this._comm.notifyShowHideLoader({ show: false });
		});
	}

	openDialog(element: any) {
		const dialogRef = this.dialog.open(AlertMatDialogComponent, {
		  width: '630px',
		  data: { element: element, value: '' }
		});
	
		dialogRef.afterClosed().subscribe(result => {
			
			if(result.element.id == element.id){
				this.editValues(result);
			}
		});
	}

	editValues(result: any){
		let arrString = result.value.split(",");
		this._comm.notifyShowHideLoader({show: true});
		this.optionService.editAttributeOrOption(result, arrString).subscribe(res=>{
			if(res.status == 200){
				this._comm.notifyShowHideLoader({show: false});
				this.alert.success('Success', this.translate.instant('errorMessage.RequestSucc'));
			}
		}, error=>{
			this._comm.notifyShowHideLoader({show: false});
			this.alert.error('Error', this.translate.instant('errorMessage.RequestErr'));
		});
	}

	getCategories(){
		this._comm.notifyShowHideLoader({ show: true });
		this.optionService.getAllCategories().subscribe(res=>{
			this._comm.notifyShowHideLoader({ show: false });
			if(res.status == 200){
				this.categories = res['body'];
			}
		},error=>{
			this._comm.notifyShowHideLoader({ show: false });
		});
	}

	onCategoryChange(event: any){
		this._comm.notifyShowHideLoader({ show: true });
		console.log(this.optionForm.value);
		this.subCategoryObject.id = undefined;
		this.dataSource.data = [];
		this.dataEmpty = true;
		this.optionService.getAllSubCategories(event.value).subscribe(res =>{
			this._comm.notifyShowHideLoader({ show: false });	
			if(res.status == 200){
				this.subCategories = res['body'];
			}
		},error=>{
			this._comm.notifyShowHideLoader({ show: false });
		});
	}

	onRadioChange(event: any){
		console.log(event);
	}

	// Methods for chip list
	add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;
		console.log(this.optionForm.value);
		// Add our value
		if ((value || '').trim()) {
			this.options.push(value);
			this.optionForm.get('value').setValue(this.options);
		}
	
		// Reset the input value
		if (input) {
		  input.value = '';
		}
	  }
	
	  remove(option: Option): void {
		const index = this.options.indexOf(option);
	
		if (index >= 0) {
		  this.options.splice(index, 1);
		  this.optionForm.get('value').setValue(this.options);
		}
	  }
}
