import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerListComponent } from './banner-list/banner-list.component';
import { BannerCreateComponent } from './banner-create/banner-create.component';
import {BannerRoutingModule} from './banner-routing.module'
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from 'src/app/material-modules';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from '../../_helpers/auth.guard';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
@NgModule({
  declarations: [BannerListComponent, BannerCreateComponent],
  imports: [
    CommonModule,
    BannerRoutingModule,
    FormsModule,
    MaterialModules,
    MatComponentsModule,
    RxReactiveFormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    NgxMatSelectSearchModule
  ],
  providers: [ AuthGuard ]
})
export class BannerModule { }
