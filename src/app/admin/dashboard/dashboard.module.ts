import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { StatComponent } from './stat/stat.component';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from 'src/app/material-modules';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatGridListModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    Ng2Charts,
    TranslateModule,
    MaterialModules,
    MatComponentsModule,
    SharedModule,
    RxReactiveFormsModule,
    FormsModule
  ],
  declarations: [HomeComponent, StatComponent],
  providers: [ AuthGuard]
})
export class DashboardModule {}
