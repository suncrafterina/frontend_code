import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../_helpers/auth.guard';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { EnquiryRoutingModule } from './enquiry-routing.module';
import { EnquiryDetailComponent } from './enquiry-detail/enquiry-detail.component';
import { MaterialModules } from '../../material-modules';
import { SharedModule } from '../../shared/shared.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
@NgModule({
    declarations: [ EnquiryListComponent, EnquiryDetailComponent ],
    imports: [
        CommonModule,
        EnquiryRoutingModule,
        FormsModule, 
        MaterialModules,
        ReactiveFormsModule,
        RxReactiveFormsModule,
        SharedModule,
        TranslateModule
    ],
    providers: [ AuthGuard ]
})

export class EnquiryModule {}