import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_helpers';
import { TranslateModule } from '@ngx-translate/core';
import { LocationComponent } from './location/location.component';


const shippingRoutes: Routes = [
    {
        path: 'location',
        data: {title:" Location List"},
        component: LocationComponent,
        canActivate:[AuthGuard]
    }

];

const shipping: Routes = [
    {
        path: '',
        data: { title: 'Shipping' },
        children: shippingRoutes
    }
];

@NgModule({
    imports: [ RouterModule.forChild(shipping), TranslateModule ],
    exports: [ RouterModule ]
})

export class shippingRoutingModule { }