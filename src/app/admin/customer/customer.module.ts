import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../../material-modules';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from 'src/app/_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';



@NgModule({
  declarations: [CustomerListComponent, CustomerDetailsComponent, CustomerAddComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    MaterialModules,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule
  ]
})
export class CustomerModule { }
