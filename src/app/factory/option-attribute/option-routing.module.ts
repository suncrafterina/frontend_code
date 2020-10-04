import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { OptionListComponent } from './option-list/option-list.component';
import { OptionAddComponent } from './option-add/option-add.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
const routes: Routes = [
    {
        path: '',
        data: { title: 'Option and Attribute' },
        component: OptionListComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'option-add',
        data: { title: 'Option and Attribute' },
        component: OptionAddComponent,
        canActivate: [ AuthGuard ]
    }
];

const optionRoute: Routes = [
    {
        path: '',
        data: { title: 'Option and Attribute' },
        children: routes,
        canActivate: [ AuthGuard ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(optionRoute), TranslateModule ],
    exports: [ RouterModule ]
})

export class OptionRoutingModule {}