import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { OptionListComponent } from './option-list/option-list.component';
import { OptionRoutingModule } from './option-routing.module';
import { MaterialModules } from '../../material-modules';
import { SharedModule } from '../../shared/shared.module';
import { OptionAddComponent } from './option-add/option-add.component';
import { MatComponentFactoryModule } from '../mat-components/mat-component.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

@NgModule({
    declarations: [ OptionListComponent, OptionAddComponent],
    imports: [
        CommonModule,
        FormsModule, 
        MaterialModules,
        MatComponentFactoryModule,
        OptionRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        TranslateModule
        
    ],
    providers: [ AuthGuard ]
})

export class OptionModule{}