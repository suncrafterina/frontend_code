import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { QuotationComponent } from './quotation/quotation.component';
import { QuotationAddComponent } from './quotation-add/quotation-add.component';
import { QuotationDetailComponent } from './quotation-detail/quotation-detail.component';
import { QuotationLogComponent } from './quotation-log/quotation-log.component';

const quotationsRoutes: Routes = [
    {
        path: '',
        data: { title: 'Quotations List' },
        component: QuotationComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'quotation',
        data: { title: 'Quatations List' },
        component: QuotationComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'quotation-add',
        data: { title: 'quotation-add' },
        component: QuotationAddComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'quotation-detail/:id',
        data: { title: 'quotation-detail' },
        component: QuotationDetailComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'quotation-log/:id',
        data: { title: 'quotation-log' },
        component: QuotationLogComponent,
        canActivate: [ AuthGuard ]
    }
    
  
];

const quotations:Routes = [
    {
        path: '',
        data: { title: 'Quotations' },
        children: quotationsRoutes,
        canActivate: [ AuthGuard ]
        
    }
];

@NgModule({
    imports: [ RouterModule.forChild(quotations), TranslateModule ],
    exports: [ RouterModule ]
})

export class quotationsRoutingModule {}