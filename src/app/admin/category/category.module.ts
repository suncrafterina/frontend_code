import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryCreateComponent} from './category-create/category-create.component';
import { MaterialModules } from 'src/app/material-modules';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddOptionComponent } from './add-option/add-option.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubcategoryCreateComponent } from './subcategory-create/subcategory-create.component';
import { SubcategoryListComponent } from './subcategory-list/subcategory-list.component';

import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { AddOptionCreateComponent } from './add-option-create/add-option-create.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { AttributeCreateComponent } from './attribute-create/attribute-create.component';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { SubcategoryCreateLevel3Component } from './subcategory-create-level3/subcategory-create-level3.component';
import { SubcategoryListLevel3Component } from './subcategory-list-level3/subcategory-list-level3.component';
import { CatCommissionListComponent } from './cat-commission-list/cat-commission-list.component';
import { CatCommissionCreateComponent } from './cat-commission-create/cat-commission-create.component';
import { OthersCommissionComponent } from './others-commission/others-commission.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { FactoryCommissionComponent } from './factory-commission/factory-commission.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {StylePaginatorDirective} from './category-list/style-paginator.directive';
@NgModule({
  declarations: [CategoryListComponent,CategoryCreateComponent, SubcategoryCreateComponent, 
    SubcategoryListComponent,AddOptionComponent, AttributeCreateComponent, 
    AttributeListComponent,AddOptionCreateComponent, SubcategoryCreateLevel3Component, 
    SubcategoryListLevel3Component, CatCommissionListComponent, CatCommissionCreateComponent, 
    OthersCommissionComponent, WarehouseComponent, FactoryCommissionComponent,StylePaginatorDirective],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MaterialModules,
    RxReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule
  ],
   
  
   providers: [ AuthGuard]
})
export class CategoryModule { }
