import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseAddComponent } from './warehouse-add/warehouse-add.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { WarehouseViewComponent } from './warehouse-view/warehouse-view.component';
import { AuthGuard } from 'src/app/_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

const routesWarehouse: Routes = [
    {
        path: '',
        data: { title: 'Warehouse List' },
        component: WarehouseListComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'warehouse-view/:id',
        data: { title: 'Warehouse View' },
        component: WarehouseViewComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'warehouse-add',
        data: { title: 'Warehouse Add' },
        component: WarehouseAddComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path:'warehouse-edit/:id',
        data: {title: 'Warehouse Edit'},
        component: WarehouseAddComponent,
        canActivate: [ AuthGuard ]
    }
];

const warehouse:Routes = [
    {
        path: '',
        data: { title: 'Warehouse' },
        children: routesWarehouse,
        canActivate: [ AuthGuard ]
        
    }
];

@NgModule({
    imports: [ RouterModule.forChild(warehouse), TranslateModule ],
    exports: [ RouterModule ]
})

export class WarehousePagesRoutingModule {}