import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModules } from '../../material-modules';
import { MatDialogModule } from '@angular/material/dialog';

import { AlertMatDialogComponent } from './mat-dialog/alert-mat-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MaterialModules,
        ReactiveFormsModule
    ],
    declarations: [ AlertMatDialogComponent ],
    exports: [ AlertMatDialogComponent ],
    entryComponents: [ AlertMatDialogComponent ]
})

export class MatComponentFactoryModule{}