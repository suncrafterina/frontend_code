import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MaterialModules } from '../material-modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'alert-mat-dialog',
  templateUrl: 'alert-mat-dialog.component.html',
})
export class AlertMatDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AlertMatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}