import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { RequestsListComponent } from './requests-list/requests-list.component';

const requestsRoutes: Routes = [
   {
       path: 'requests-list',
       data: {title:" Requests List"},
       component: RequestsListComponent,
       canActivate:[AuthGuard]
   } 

];

const requests: Routes = [
    {
        path: '',
        data: { title: 'Requests' },
        children: requestsRoutes
    }
];

@NgModule({
    imports: [ RouterModule.forChild(requests), TranslateModule ],
    exports: [ RouterModule ]
})

export class RequestsRoutingModule { }