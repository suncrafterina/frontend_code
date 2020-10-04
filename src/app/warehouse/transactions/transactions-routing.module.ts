import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionsDetailsComponent } from './transactions-details/transactions-details.component';

const transactionsRoutes: Routes = [
    {
        path: '',
        data: { title: 'Transactions List' },
        component: TransactionsListComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'transactions-details/:id',
        data: { title: 'Transactions Details' },
        component: TransactionsDetailsComponent,
        canActivate: [ AuthGuard ]
    }
   
];

const transactions:Routes = [
    {
        path: '',
        data: { title: 'transactions' },
        children: transactionsRoutes,
        canActivate: [ AuthGuard ]
        
    }
];

@NgModule({
    imports: [ RouterModule.forChild(transactions), TranslateModule ],
    exports: [ RouterModule ]
})

export class transactionsRoutingModule {}