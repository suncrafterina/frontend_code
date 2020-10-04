import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAQRoutingModule } from './faq-routing.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from 'src/app/material-modules';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FaqCreateComponent } from './faq-create/faq-create.component';
import { AuthGuard } from '../../_helpers/auth.guard';
import { FaqListComponent } from './faq-list/faq-list.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
@NgModule({
    declarations: [ FaqCreateComponent, FaqListComponent ],
    imports: [
        CommonModule,
        FAQRoutingModule,
        FormsModule,
        MaterialModules,
        MatComponentsModule,
        RxReactiveFormsModule,
        ReactiveFormsModule,
        SharedModule,
        TranslateModule
    ],
    providers: [ AuthGuard ]
})

export class FaqModule {}