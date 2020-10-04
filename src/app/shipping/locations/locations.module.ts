import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../../material-modules';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from 'src/app/_helpers';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { locationsRoutingModule } from './locations-routing.module';
import { LocationComponent } from './location/location.component';
import { LocationAddComponent } from './location-add/location-add.component';
@NgModule({
    declarations: [LocationComponent, LocationAddComponent ],
    imports: [
        CommonModule,
        FormsModule, 
        MaterialModules,
        ReactiveFormsModule,
        SharedModule,
        TranslateModule,
        locationsRoutingModule
    ],
    providers: [ AuthGuard ]
})

export class LocationsModule {}