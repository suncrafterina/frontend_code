import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../_helpers';
import { Routes, RouterModule } from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
const productRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: { title: 'Product' },
    canActivate: [AuthGuard],
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    data: { title: 'Product' },
    canActivate: [AuthGuard],
  },


];
const product: Routes = [
  {
    path: '',
    data: { title: 'Product Mangement' },
    children: productRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(product),TranslateModule],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
