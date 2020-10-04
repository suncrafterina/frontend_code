import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MaterialModules } from '../material-modules';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { AuthGuard } from '../_helpers';
import { LayoutComponent } from './layout/layout.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { SharedModule } from '../shared/shared.module';
import { MessageService } from '../_services/message.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
@NgModule({
    declarations:[LayoutComponent, TopNavComponent,SideNavComponent],
    imports: [
        CommonModule,
        MaterialModules,
        SharedModule,
        WarehouseRoutingModule,
        TranslateModule
    ],
    providers: [ AuthGuard, MessageService ]
})

export class WarehouseModule {}