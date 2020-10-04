import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModules } from 'src/app/material-modules';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { StarRatingModule } from 'angular-star-rating';
import { SalesRoutingModule } from './sales-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [OrdersComponent, TransactionsComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    MaterialModules,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    SharedModule,
    TranslateModule,
    StarRatingModule.forRoot()
  ],
  providers: [ AuthGuard ]
})
export class SalesModule { }
