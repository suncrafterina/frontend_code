import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CMSRoutingModule } from './cms-routing.module';
import { MaterialModules } from '../../material-modules';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from 'src/app/_helpers';
import { CmsListComponent } from './cms-list/cms-list.component';
import { CmsEditComponent } from './cms-edit/cms-edit.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
@NgModule({
    imports: [
        CommonModule,
        CMSRoutingModule,
        FormsModule,
        MaterialModules,
        ReactiveFormsModule,
        SharedModule,
        TranslateModule
    ],
    declarations: [CmsListComponent, CmsEditComponent],
    providers: [ AuthGuard ]
})

export class CMSModule {}