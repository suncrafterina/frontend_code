import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FactoryRoutingModule } from './factory-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS,HttpClientXsrfModule,HttpClient } from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { MessageService } from '../_services/message.service';
import { StarRatingModule } from 'angular-star-rating';
@NgModule({
  declarations:[LayoutComponent, TopNavComponent,SideNavComponent],
  imports: [
    CommonModule,
    FactoryRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    SharedModule,
    TranslateModule,
    StarRatingModule.forRoot()
  ],
  exports:[],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ MessageService ]
})
export class FactoryModule { }
