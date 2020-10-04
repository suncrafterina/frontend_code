import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { LocationComponent } from './location/location.component';
import { LocationAddComponent } from './location-add/location-add.component';

const shippingRoutes: Routes = [
    {
        path: '',
        data: { title: 'Shipping List' },
        component: LocationComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'location',
        data: { title: 'Shipping List' },
        component: LocationComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'location-update/:id',
        data: { title: 'Add Location' },
        component: LocationAddComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'location-add',
        data: { title: 'Add Location' },
        component: LocationAddComponent,
        canActivate: [ AuthGuard ]
    }
  
];

const shipping:Routes = [
    {
        path: '',
        data: { title: 'Shipping' },
        children: shippingRoutes,
        canActivate: [ AuthGuard ]
        
    }
];

@NgModule({
    imports: [ RouterModule.forChild(shipping), TranslateModule ],
    exports: [ RouterModule ]
})

export class locationsRoutingModule {}