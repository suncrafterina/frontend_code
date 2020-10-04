import {Component, Inject} from '@angular/core';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { CustomValidation } from 'src/app/_validators/custom-validation';
import { VendorsService } from '../vendors.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray, FormControl } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
 
export interface DialogData {
	commission: string;
	id: any;
}

@Component({
  selector: 'app-commission-mat-dialog',
  templateUrl: './commission-mat-dialog.component.html',
  styleUrls: ['./commission-mat-dialog.component.css']
})
export class CommissionMatDialogComponent {
	// matcher = new ValidationClassStateMatcher();
	// commissionForm: FormGroup;
	// commissionData:any;
  constructor(private fb: FormBuilder, private vendorsService : VendorsService,
		private _alrt: AlertService,private router: Router, private route: ActivatedRoute,
		public dialogRef: MatDialogRef<CommissionMatDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) {
			
			// this.commissionData = JSON.parse(localStorage.getItem("commissionData"));
			//this.getCategoryDetails();
		 }

	onNoClick(): void {
		this.dialogRef.close();
	}
	// formInIt() {
	// 	this.commissionForm = this.fb.group({
	// 		commission: ['', [Validators.required]],
		  
	// 	});
		//this.addOptionForm.controls.category_id.setValue();
		//this.addOptionForm.controls.parent_id.setValue(0);
	//   }
	//   hasError(field: any) {
	// 	return CustomValidation.hasError(this.commissionForm, field);
	//   }
	
	//   arrHasError(formObj: any, field: any) {
	// 	return CustomValidation.hasError(formObj, field);
	//   }

	//   getCategoryDetails() {
	// 	if (this.commissionData.id) {
	// 		  var resp = this.commissionData.commission;
	// 		//   resp['commission'] = (resp['commission']) ? resp['commission'] : null;
	// 		//   this.commissionForm.patchValue(resp);
		 
	// 	}
	//   }
	
}
