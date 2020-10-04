import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from 'src/app/material-modules';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from '../../_helpers/auth.guard';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { VendorsRoutingModule } from './vendors-routing.module';
import { ShippingListComponent } from './shipping-list/shipping-list.component';
import { FactoryListComponent } from './factory-list/factory-list.component';
import { LocationListComponent } from './location-list/location-list.component';
import { CommissionMatDialogComponent } from './commission-mat-dialog/commission-mat-dialog.component';
import { WarCommissionMatDialogComponent } from './war-commission-mat-dialog/war-commission-mat-dialog.component';
import { FactoryCommissionEditComponent } from './factory-commission-edit/factory-commission-edit.component';
import { FactoryDetailsComponent } from './factory-details/factory-details.component';
import { WarehouseVendorComponent } from './warehouse-vendor/warehouse-vendor.component';
import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { StarRatingModule } from 'angular-star-rating';

@NgModule({
    declarations: [WarehouseListComponent, ShippingListComponent, FactoryListComponent, LocationListComponent, CommissionMatDialogComponent, WarCommissionMatDialogComponent, FactoryCommissionEditComponent, FactoryDetailsComponent, WarehouseVendorComponent, WarehouseDetailsComponent],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModules,
        MatComponentsModule,
        RxReactiveFormsModule,
        ReactiveFormsModule,
        SharedModule,
        VendorsRoutingModule,
        NgxImageZoomModule,
        TranslateModule,
        StarRatingModule.forRoot(),
    ],
    providers: [ AuthGuard ]
})

export class VendorsModule {}