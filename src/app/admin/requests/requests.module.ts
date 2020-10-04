import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from 'src/app/material-modules';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from '../../_helpers/auth.guard';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { RequestsRoutingModule } from './requests-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { RequestsListComponent } from './requests-list/requests-list.component';
@NgModule({
    declarations: [RequestsListComponent],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModules,
        MatComponentsModule,
        RxReactiveFormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxImageZoomModule,
        RequestsRoutingModule,
        TranslateModule
    ],
    providers: [ AuthGuard ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class RequestsModule {}
