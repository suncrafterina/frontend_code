import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/_helpers';
import { TranslateModule } from '@ngx-translate/core';

const route: Routes = [
	{
		path: '',
		component: HomeComponent,
		data: { title: 'home' },
		canActivate: [ AuthGuard ]
	}
];

const warehouse: Routes = [
	{
		path: '',
		canActivate: [ AuthGuard ],
		data: { title: 'dashboard' },
		children: route
	}
];


@NgModule({
	imports: [ RouterModule.forChild(warehouse),TranslateModule ],
	exports: [ RouterModule ]
})
export class DashboardRoutingModule { }
