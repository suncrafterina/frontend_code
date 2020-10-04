import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
	title: string;
    type: string;
    values: string[];
    category_id: any;
	id: any;
	value: null;
}

@Component({
	selector: 'alert-mat-dialog',
	templateUrl: './alert-mat-dialog.component.html',
})
export class AlertMatDialogComponent {

	title: any;
	value: any;
	constructor(
		public dialogRef: MatDialogRef<AlertMatDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) { 
			this.title = data['element']['title'];
			this.value = data['value'];
		}

	onNoClick(element:any): void {
        console.log(element);
		this.dialogRef.close();
	}

}