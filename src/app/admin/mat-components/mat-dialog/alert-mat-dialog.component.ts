import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
	title: string;
	name: string;
	id: any;
}

@Component({
	selector: 'alert-mat-dialog',
	templateUrl: './alert-mat-dialog.component.html',
})
export class AlertMatDialogComponent {

	constructor(
		public dialogRef: MatDialogRef<AlertMatDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

}