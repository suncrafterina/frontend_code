import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
 import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';

const customerRoutes: Routes = [
    {
        path: 'customer-list',
        data: { title: 'Customer List' },
        component: CustomerListComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'customer-list',
        data: { title: 'Customer List' },
        component: CustomerListComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'customer-add',
        data: { title: 'customer-add' },
        component: CustomerAddComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'customer-details/:id',
        data: { title: 'customer-details' },
        component: CustomerDetailsComponent,
        canActivate: [ AuthGuard ]
    }
];

const customer: Routes = [
    {
        path: '',
        data: { title: '' },
        children: customerRoutes
    }
];

@NgModule({
  imports: [ RouterModule.forChild(customer), TranslateModule ],
  exports: [ RouterModule ]
})

export class CustomerRoutingModule { }
