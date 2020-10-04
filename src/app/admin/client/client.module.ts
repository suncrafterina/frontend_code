import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from 'src/app/material-modules';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from '../../_helpers/auth.guard';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { ClientRoutingModule } from './client-routing.module';


@NgModule({
  declarations: [ClientListComponent, ClientCreateComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    MaterialModules,
    MatComponentsModule,
    RxReactiveFormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule
  ],
  providers: [ AuthGuard ]
})
export class ClientModule { }
