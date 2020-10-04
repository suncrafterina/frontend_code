import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS,HttpClientXsrfModule,HttpClient } from '@angular/common/http';
import { MaterialModules } from './material-modules';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
//import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CategoryRoutingModule } from './admin/category/category-routing.module';
import { ToastrModule } from 'ngx-toastr'; /// alert
import { FormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './admin/profile/profile-routing.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MatSelectModule } from '@angular/material/select';
import { FactoryRoutingModule } from './factory/factory-routing.module';
import { DashboardRoutingModule } from './factory/dashboard/dashboard-routing.module';
import { ProductRoutingModule } from './factory/product/product-routing.module';
import { ShippingRoutingModule } from './shipping/shipping-routing.module';
import { SalesRoutingModule } from './factory/sales/sales-routing.module';
import { CustomerRoutingModule } from './admin/customer/customer-routing.module';
import {MessageService} from './_services/message.service';
import { JwPaginationModule } from 'jw-angular-pagination';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModules,
        SharedModule,
        CategoryRoutingModule,
        MatSelectModule,
        ToastrModule.forRoot(),
        HttpClientXsrfModule.withOptions({
            cookieName: 'XSRF-TOKEN',
            headerName: 'X-XSRF-TOKEN',
          }),
        ProfileRoutingModule,
        TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
      }),
        FactoryRoutingModule,
        DashboardRoutingModule,
        ProductRoutingModule,
        ShippingRoutingModule,
        SalesRoutingModule,
        CustomerRoutingModule,
        JwPaginationModule
      
    ],
    declarations: [
        AppComponent,
       // AlertComponent,
        HomeComponent,
        
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        MessageService
        // provider used to create fake backend
        
    ],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { };

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}