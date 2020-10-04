import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../../material-modules';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from 'src/app/_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { transactionsRoutingModule } from './transactions-routing.module';
@NgModule({
    declarations: [TransactionsListComponent ],
    imports: [
        CommonModule,
        FormsModule, 
        MaterialModules,
        transactionsRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        TranslateModule
    ],
    providers: [ AuthGuard ]
})

export class transactionsModule {}