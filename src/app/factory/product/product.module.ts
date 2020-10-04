import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModules } from 'src/app/material-modules';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { ProductComponent } from './product/product.component';
import {ProductRoutingModule } from './product-routing.module';
import { SpecificationComponent } from './specification/specification.component';
import { ProductListComponent } from './product-list/product-list.component';
import { GalleryComponent } from './gallery/gallery.component';
import { DynamicAttributesComponent } from './dynamic-attributes/dynamic-attributes.component';
import { StarRatingModule } from 'angular-star-rating';

@NgModule({
  declarations: [ProductComponent, SpecificationComponent, ProductListComponent, GalleryComponent, DynamicAttributesComponent],
  imports: [
    CommonModule,
    MaterialModules,
    RxReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    ProductRoutingModule,
    StarRatingModule.forRoot() 
  ]
})
export class ProductModule { }
