import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_helpers';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
// ng generate module enquiry --route enquiry
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { ShippingListComponent } from './shipping-list/shipping-list.component';
import { FactoryListComponent } from './factory-list/factory-list.component';
import { LocationListComponent } from './location-list/location-list.component';
import { FactoryCommissionEditComponent } from './factory-commission-edit/factory-commission-edit.component';
import { FactoryDetailsComponent } from './factory-details/factory-details.component';
import { WarehouseVendorComponent } from './warehouse-vendor/warehouse-vendor.component';
import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';

const vendorsRoutes: Routes = [
   {
       path: 'warehouse-list',
       data: {title:" Warehouse List"},
       component: WarehouseListComponent,
       canActivate:[AuthGuard]
   },
   {
    path: 'shipping-list',
    component: ShippingListComponent,
    data: { title: 'shipping List' },
    canActivate: [AuthGuard],
  },
  {
    path: 'factory-list',
    component: FactoryListComponent,
    data: { title: 'Factory List' },
    canActivate: [AuthGuard],
  },
  {
    path: 'location-list/:id',
    component: LocationListComponent,
    data: { title: 'location List' },
    canActivate: [AuthGuard],
  },
  {
    path: 'commission-edit/:user_id',
    component: FactoryCommissionEditComponent,
    data: { title: 'factory-commission-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'factory-details/:user_id',
    component: FactoryDetailsComponent,
    data: { title: 'factory-details' },
    canActivate: [AuthGuard],
  },
  {
    path: 'warehouse-vendor/:user_id',
    component: WarehouseVendorComponent,
    data: { title: 'warehouse-vendor' },
    canActivate: [AuthGuard],
  },
  {
    path: 'warehouse-detail/:id',
    component: WarehouseDetailsComponent,
    data: { title: 'warehouse-detail' },
    canActivate: [AuthGuard],
  },

];

const vendors: Routes = [
    {
        path: '',
        data: { title: 'Vendors' },
        children: vendorsRoutes
    }
];

@NgModule({
    imports: [ RouterModule.forChild(vendors), TranslateModule ],
    exports: [ RouterModule ]
})

export class VendorsRoutingModule { }