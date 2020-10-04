import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from 'src/app/material-modules';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AuthGuard } from 'src/app/_helpers';
import { StatComponent } from './stat/stat.component';
import { MatComponentsModule } from 'src/app/admin/mat-components/mat-components.module';

@NgModule({
	declarations: [  HomeComponent, StatComponent],
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
	providers: [ AuthGuard ]
})
export class DashboardModule { }
