import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryCreateComponent} from './category-create/category-create.component';
import {SubcategoryCreateComponent} from './subcategory-create/subcategory-create.component';
import {SubcategoryListComponent} from './subcategory-list/subcategory-list.component';
import {AttributeListComponent} from './attribute-list/attribute-list.component';
import {AttributeCreateComponent} from './attribute-create/attribute-create.component';
import { AuthGuard } from '../../_helpers';
import { AddOptionComponent } from './add-option/add-option.component';
import { AddOptionCreateComponent } from './add-option-create/add-option-create.component';
import { SubcategoryListLevel3Component } from './subcategory-list-level3/subcategory-list-level3.component';
import { SubcategoryCreateLevel3Component } from './subcategory-create-level3/subcategory-create-level3.component';
import { CatCommissionListComponent } from './cat-commission-list/cat-commission-list.component';
import { CatCommissionCreateComponent } from './cat-commission-create/cat-commission-create.component';
import { OthersCommissionComponent } from './others-commission/others-commission.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

const categoryRoutes: Routes = [
  {
    path: 'category-list',
    component: CategoryListComponent,
    data: { title: 'Category' },
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: CategoryCreateComponent,
    data: { title: 'Create Category' },
    canActivate: [AuthGuard],
  },
  {
    path: 'add-option/:cat/:subcat',
    component: AddOptionComponent,
    data: { title: 'Add Option' },
    canActivate: [AuthGuard],
  },
  {
    path: 'option-edit/:cat/:subcat/:id',
    component: AddOptionCreateComponent,
    data: { title: 'Edit Attribute' },
    canActivate: [AuthGuard],
  },
  {
    path: 'add-option-create/:cat/:subcat',
    component: AddOptionCreateComponent,
    data: { title: 'Edit Option' },
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: CategoryCreateComponent,
    data: { title: 'Edit Category' },
    canActivate: [AuthGuard],
  },
  {
    path: 'view/:id',
    component: CategoryCreateComponent,
    data: { title: 'View Category' },
    canActivate: [AuthGuard],
  },
  {
    path: 'subcategory-create/:cat',
    component: SubcategoryCreateComponent,
    data: { title: 'Create Subcategory' },
    canActivate: [AuthGuard],
  },
  {
    path: 'subcategory-list/:cat',
    component: SubcategoryListComponent,
    data: { title: 'Subcategory' },
    canActivate: [AuthGuard],
  },
  {
    path: 'subcategory-edit/:cat/:id',
    component: SubcategoryCreateComponent,
    data: { title: 'Edit Category' },
    canActivate: [AuthGuard],
  },
  {
    path: 'attribute-list/:cat/:subcat',
    component: AttributeListComponent,
    data: { title: 'Attribute' },
    canActivate: [AuthGuard],
  },
  {
    path: 'attribute-create/:cat/:subcat',
    component: AttributeCreateComponent,
    data: { title: 'Edit Attribute' },
    canActivate: [AuthGuard],
  },
  {
    path: 'attribute-edit/:cat/:subcat/:id',
    component: AttributeCreateComponent,
    data: { title: 'Edit Attribute' },
    canActivate: [AuthGuard],
  },
  {
    path: 'subcategory-list-level3/:cat/:subcat',
    component: SubcategoryListLevel3Component,
    data: { title: 'Attribute' },
    canActivate: [AuthGuard],
  },
  {
    path: 'subcategory-create-level3/:cat/:subcat',
    component: SubcategoryCreateLevel3Component,
    data: { title: 'Attribute' },
    canActivate: [AuthGuard],
  },
  {
    path: 'subcategory-create-level3-edit/:cat/:subcat/:id',
    component: SubcategoryCreateLevel3Component,
    data: { title: 'Edit Attribute' },
    canActivate: [AuthGuard],
  },
  {
    path: 'cat-commission-list',
    component: CatCommissionListComponent,
    data: { title: 'Commission' },
    canActivate: [AuthGuard],
  },
  {
    path: 'commission-create',
    component: CatCommissionCreateComponent,
    data: { title: 'create Commission' },
    canActivate: [AuthGuard],
  },
  {
    path: 'commission-edit/:id',
    component: CatCommissionCreateComponent,
    data: { title: 'Edit Category' },
    canActivate: [AuthGuard],
  },
  
  {
    path: 'others-commission',
    component: OthersCommissionComponent,
    data: { title: 'Others Commission' },
    canActivate: [AuthGuard],
  },
  {
    path: 'warehouse',
    component: WarehouseComponent,
    data: { title: 'warehouses' },
    canActivate: [AuthGuard],
  },
   
 
  //  {
  //   path: 'commission-dialog/:id',
  //   component: CommissionDialogComponent,
  //   data: { title: 'location-list' },
  //   canActivate: [AuthGuard],
  // },
];
const category: Routes = [
  {
    path: '',
    data: { title: 'Category' },
    children: categoryRoutes
  }
];
@NgModule({
  imports: [RouterModule.forChild(category),TranslateModule],
  exports: [RouterModule],
})
export class CategoryRoutingModule { }
