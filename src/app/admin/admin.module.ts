import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { MessageService } from '../_services/message.service';
import { MainNavigationComponent } from 'src/app/shared/main-navigation/main-navigation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [LayoutComponent, TopNavComponent, SideNavComponent],
  providers: [MessageService],
  exports:[],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule {}
