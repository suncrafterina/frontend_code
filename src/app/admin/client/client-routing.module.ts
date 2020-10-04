import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientListComponent } from './client-list/client-list.component';
const clientRoutes: Routes = [
  {
      path: 'create',
      component: ClientCreateComponent,
      data: { title: 'Create Client' },
      canActivate: [ AuthGuard ],
  },
  {
      path: '',
      component: ClientListComponent,
      data: { title: 'List Client' },
      canActivate: [ AuthGuard ],
  },
  {
      path: 'create/:id',
      component: ClientCreateComponent,
      data: { title: 'Edit Client' },
      canActivate: [ AuthGuard ]
  }
];

const client: Routes = [
  {
      path: '',
      data: { title: 'Client' },
      children: clientRoutes
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(client), TranslateModule ],
  exports: [ RouterModule ]
})
export class ClientRoutingModule { }
