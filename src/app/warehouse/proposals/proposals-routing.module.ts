import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { ProposalsListComponent } from './proposals-list/proposals-list.component';
import { ProposalsAddComponent } from './proposals-add/proposals-add.component';
import { ProposalsDetailsComponent } from './proposals-details/proposals-details.component';

const proposalsRoutes: Routes = [
    {
        path: '',
        data: { title: 'Proposals List' },
        component: ProposalsListComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'proposals-add',
        data: { title: 'Proposals Add' },
        component: ProposalsAddComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'proposals-details/:id',
        data: { title: 'Proposals Details' },
        component: ProposalsDetailsComponent,
        canActivate: [ AuthGuard ]
    }
];

const proposals:Routes = [
    {
        path: '',
        data: { title: 'Proposals' },
        children: proposalsRoutes,
        canActivate: [ AuthGuard ]
        
    }
];

@NgModule({
    imports: [ RouterModule.forChild(proposals), TranslateModule ],
    exports: [ RouterModule ]
})

export class proposalsRoutingModule {}