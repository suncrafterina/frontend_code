import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from 'src/app/material-modules';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from '../../_helpers/auth.guard';
import { shippingRoutingModule } from './shipping-routing.module';
import { LocationComponent } from './location/location.component';


@NgModule({
    declarations: [LocationComponent],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModules,
        MatComponentsModule,
        RxReactiveFormsModule,
        ReactiveFormsModule,
        SharedModule,
        shippingRoutingModule
    ],
    providers: [ AuthGuard ]
})

export class ShippingModule {}