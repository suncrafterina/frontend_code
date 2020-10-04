import {Component, Inject} from '@angular/core';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { CustomValidation } from 'src/app/_validators/custom-validation';
import { VendorsService } from '../vendors.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray, FormControl } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommissionMatDialogComponent } from '../commission-mat-dialog/commission-mat-dialog.component';
export interface DialogData {
	commission: string;
	id: any;
}

@Component({
  selector: 'app-war-commission-mat-dialog',
  templateUrl: './war-commission-mat-dialog.component.html',
  styleUrls: ['./war-commission-mat-dialog.component.css']
})
export class WarCommissionMatDialogComponent {

  constructor(public dialogRef: MatDialogRef<WarCommissionMatDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
		this.dialogRef.close();
	}
}
