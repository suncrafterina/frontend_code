import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderListComponent  } from './order-list/order-list.component';
import { AuthGuard } from 'src/app/_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { OrderViewComponent } from './order-view/order-view.component';
import { TransactionsComponent } from './transactions/transactions.component';

const salesRoute: Routes = [
  {
      path: 'order-list',
      component: OrderListComponent,
      data: { title: 'Order List' },
      canActivate: [AuthGuard]
  },
  {
      path: '',
      component: OrderListComponent,
      data: { title: 'Order List' },
      canActivate: [AuthGuard]
  },
  {
    path: 'order-view/:id',
    component: OrderViewComponent,
    data: { title: 'Order List' },
    canActivate: [AuthGuard]
},
{
  path: 'transactions',
  component: TransactionsComponent,
  data: { title: 'Transactions List' },
  canActivate: [AuthGuard]
},
  
];

const sales: Routes = [
  {
      path: '',
      data: { title: 'Sales' },
      children: salesRoute
  }
];

@NgModule({
  imports: [ RouterModule.forChild(sales),TranslateModule],
  exports: [ RouterModule ]
})
export class SalesRoutingModule { }
