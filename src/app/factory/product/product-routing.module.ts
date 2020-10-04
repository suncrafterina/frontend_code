import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../_helpers';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product/product.component';
import {SpecificationComponent} from './specification/specification.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { DynamicAttributesComponent } from './dynamic-attributes/dynamic-attributes.component';
import {ProductListComponent} from './product-list/product-list.component';
import {GalleryComponent} from './gallery/gallery.component';
const productRoutes: Routes = [
  {
    path: 'general-information',
    component: ProductComponent,
    data: { title: 'Product' },
    canActivate: [AuthGuard],
  },
  {
    path: 'general-information/:id',
    component: ProductComponent,
    data: { title: 'Product' },
    canActivate: [AuthGuard],
  },
  {
    path: 'specification/:id',
    component: SpecificationComponent,
    data: { title: 'Product' },
    canActivate: [AuthGuard],
  },
  {
    path: 'dynamic-attributes/:id',
    component: DynamicAttributesComponent,
    data: { title: 'Product' },
    canActivate: [AuthGuard],
  },
  {
    path: 'gallery/:id',
    component: GalleryComponent,
    data: { title: 'Product' },
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: ProductListComponent,
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
