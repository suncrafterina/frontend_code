import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { BannerCreateComponent } from './banner-create/banner-create.component';
import { BannerListComponent } from './banner-list/banner-list.component';
const bannerRoutes: Routes = [
  {
      path: 'create',
      component: BannerCreateComponent,
      data: { title: 'Create Banner' },
      canActivate: [ AuthGuard ],
  },
  {
      path: '',
      component: BannerListComponent,
      data: { title: 'List Banner' },
      canActivate: [ AuthGuard ],
  },
  {
      path: 'create/:id',
      component: BannerCreateComponent,
      data: { title: 'Edit Banner' },
      canActivate: [ AuthGuard ]
  }
];

const banner: Routes = [
  {
      path: '',
      data: { title: 'Banner' },
      children: bannerRoutes
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(banner), TranslateModule ],
  exports: [ RouterModule ]
})
export class BannerRoutingModule { }
