import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../_helpers';
import { childRoutes } from './child-routes';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

const route: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
                canActivate: [ AuthGuard ]
            },
            ...childRoutes
        ]
    }
];


@NgModule({
    imports: [ RouterModule.forChild(route), TranslateModule ],
    exports: [ RouterModule ],
    providers: [ AuthGuard ]
})

export class WarehouseRoutingModule {}