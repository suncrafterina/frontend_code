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
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderListComponent } from './order-list/order-list.component';
import { TransactionsComponent } from './transactions/transactions.component';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

@NgModule({
  declarations: [OrderViewComponent,OrderListComponent, TransactionsComponent],
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
