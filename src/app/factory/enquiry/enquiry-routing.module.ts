import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { EnquiryDetailComponent } from './enquiry-detail/enquiry-detail.component';
import { AuthGuard } from 'src/app/_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
const enquiryRoute: Routes = [
    {
        path: 'enquiry-list',
        component: EnquiryListComponent,
        data: { title: 'Enquiry List' },
        canActivate: [AuthGuard]
    },
    {
        path: 'enquiry-detail/:id',
        component: EnquiryDetailComponent,
        data: { title: 'Enquiry List' },
        canActivate: [AuthGuard]
    }
];

const enquiry: Routes = [
    {
        path: '',
        data: { title: 'Enquiry' },
        children: enquiryRoute
    }
];

@NgModule({
    imports: [ RouterModule.forChild(enquiry), TranslateModule ],
    exports: [ RouterModule ]
})

export class EnquiryRoutingModule { } 