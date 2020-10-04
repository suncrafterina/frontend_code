import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';


const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const AdminModule = ()=>import('./admin/admin.module').then(x => x.AdminModule);
const FactoryModule = ()=>import('./factory/factory.module').then(x => x.FactoryModule);
const warehouseModule = () => import('./warehouse/warehouse.module').then(x => x.WarehouseModule);
const ShippingModule = () => import('./shipping/shipping.module').then(x => x.ShippingModule);
const routes: Routes = [
    { path: '', loadChildren: accountModule},
    { path: 'admin',loadChildren: AdminModule},
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'factory', loadChildren: FactoryModule },
    { path: 'warehouse', loadChildren: warehouseModule },
    { path: 'shipping', loadChildren: ShippingModule },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {
  

 }
