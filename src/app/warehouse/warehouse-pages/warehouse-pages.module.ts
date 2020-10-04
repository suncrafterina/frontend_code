import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../../material-modules';
import { SharedModule } from '../../shared/shared.module';
import { WarehousePagesRoutingModule } from './warehouse-pages-routing.module';
import { AuthGuard } from 'src/app/_helpers';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { WarehouseViewComponent } from './warehouse-view/warehouse-view.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { WarehouseAddComponent } from './warehouse-add/warehouse-add.component';
import { WarehouseEditComponent } from './warehouse-edit/warehouse-edit.component';
@NgModule({
    declarations: [ WarehouseListComponent, WarehouseViewComponent, WarehouseAddComponent ],
    imports: [
        CommonModule,
        FormsModule, 
        MaterialModules,
        ReactiveFormsModule,
        SharedModule,
        WarehousePagesRoutingModule,
        TranslateModule
    ],
    providers: [ AuthGuard ]
})

export class WarehousePagesModule {}