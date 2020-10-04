import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsEditComponent } from './cms-edit/cms-edit.component';
import { CmsListComponent } from './cms-list/cms-list.component';
import { AuthGuard } from 'src/app/_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
const cmsRoutes: Routes = [
    {
        path: 'cms-list',
        data: { title: 'CMS List' },
        component: CmsListComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'cms-edit/:slug',
        data: { title: 'CMS Edit' },
        component: CmsEditComponent,
        canActivate: [ AuthGuard ]
    }
];

const cms: Routes = [
    {
        path: '',
        data: { title: '' },
        children: cmsRoutes
    }
];

@NgModule({
    imports: [ RouterModule.forChild(cms), TranslateModule ],
    exports: [ RouterModule ]
})

export class CMSRoutingModule {}