import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_helpers';
import { FaqCreateComponent } from './faq-create/faq-create.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

const faqRoutes: Routes = [
    {
        path: 'create',
        component: FaqCreateComponent,
        data: { title: 'Create FAQ' },
        canActivate: [ AuthGuard ],
    },
    {
        path: 'faq-list',
        component: FaqListComponent,
        data: { title: 'List FAQ' },
        canActivate: [ AuthGuard ],
    },
    {
        path: 'faq-edit/:id',
        component: FaqCreateComponent,
        data: { title: 'Edit FAQ' },
        canActivate: [ AuthGuard ]
    }
];

const faq: Routes = [
    {
        path: '',
        data: { title: 'FAQs' },
        children: faqRoutes
    }
];

@NgModule({
    imports: [ RouterModule.forChild(faq), TranslateModule ],
    exports: [ RouterModule ]
})

export class FAQRoutingModule { }