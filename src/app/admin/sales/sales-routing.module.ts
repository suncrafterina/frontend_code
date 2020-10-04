import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_helpers';
// ng generate module enquiry --route enquiry
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { OrdersComponent } from './orders/orders.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const salesRoutes: Routes = [
   {
       path: 'orders',
       data: {title:" orders List"},
       component: OrdersComponent,
       canActivate:[AuthGuard]
   },
   {
    path: 'transactions',
    component: TransactionsComponent,
    data: { title: 'transactions List' },
    canActivate: [AuthGuard],
  },
  {
    path: 'order-details/:id',
    component: OrderDetailsComponent,
    data: { title: 'order-details' },
    canActivate: [AuthGuard]
},
];

const sales: Routes = [
    {
        path: '',
        data: { title: 'Sales' },
        children: salesRoutes
    }
];

@NgModule({
    imports: [ RouterModule.forChild(sales), TranslateModule ],
    exports: [ RouterModule ]
})

export class SalesRoutingModule { }