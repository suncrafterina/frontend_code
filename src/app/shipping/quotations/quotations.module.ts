import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../../material-modules';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from 'src/app/_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { quotationsRoutingModule } from './quotations-routing.module';
import { QuotationComponent } from './quotation/quotation.component';
import { QuotationDetailComponent } from './quotation-detail/quotation-detail.component';
import { QuotationLogComponent } from './quotation-log/quotation-log.component';
import { QuotationAddComponent } from './quotation-add/quotation-add.component';

@NgModule({
    declarations: [QuotationComponent, QuotationDetailComponent, QuotationLogComponent,QuotationAddComponent ],
    imports: [
        CommonModule,
        FormsModule, 
        MaterialModules,
        ReactiveFormsModule,
        SharedModule,
        TranslateModule,
        quotationsRoutingModule
    ],
    providers: [ AuthGuard, DatePipe ]
})

export class QuotationsModule {}