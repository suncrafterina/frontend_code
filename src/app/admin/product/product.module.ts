import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModules } from 'src/app/material-modules';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { StarRatingModule } from 'angular-star-rating';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgxGalleryModule } from 'ngx-gallery-9';
@NgModule({
  declarations: [ProductListComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    MaterialModules,
    RxReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    ProductRoutingModule,
    StarRatingModule.forRoot(),
    NgxImageZoomModule,
    NgxGalleryModule
     
  ]
})
export class ProductModule { }
