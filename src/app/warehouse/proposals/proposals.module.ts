import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../../material-modules';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from 'src/app/_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { proposalsRoutingModule } from './proposals-routing.module';
import { ProposalsListComponent } from './proposals-list/proposals-list.component';
import { ProposalsAddComponent } from './proposals-add/proposals-add.component';
import { ProposalsDetailsComponent } from './proposals-details/proposals-details.component';
import {DatePipe} from '@angular/common';
@NgModule({
    declarations: [  ProposalsListComponent, ProposalsAddComponent, ProposalsDetailsComponent],
    imports: [
        CommonModule,
        FormsModule, 
        MaterialModules,
        ReactiveFormsModule,
        SharedModule,
        proposalsRoutingModule,
        TranslateModule
    ],
    providers: [ AuthGuard, DatePipe ]
})

export class proposalsModule {}