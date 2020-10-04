import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';

import { NgxMaskModule } from 'ngx-mask';
//import { WebStorageModule } from 'ngx-webstorage';
import { GridsterModule } from 'angular-gridster2';
import { ChartsModule } from 'ng2-charts';

import { MaterialModules } from '../material-modules';

// directives
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { CreditCardMaskPipe } from './pipes/credit-card-mask.pipe';


// components
import { SimpleSearchComponent } from './simple-search/simple-search.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { MessageComponent } from './message/message.component';
import { TimeFieldComponent } from './time-field/time-field.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { ButtonSelectComponent } from './button-select/button-select.component';
import { SortBtnComponent } from './sort-btn/sort-btn.component';
import { DoubleButtonComponent } from './double-button/double-button.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { MultiEmailFieldComponent } from './multi-email-field/multi-email-field.component';
import { DropLabelComponent } from './drop-label/drop-label.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';

import { StatusButtonComponent } from './status-button/status-button.component';
import { EmptyDataComponent } from './empty-data/empty-data.component';
import { MainNavigationComponent } from 'src/app/shared/main-navigation/main-navigation.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { ProductTabComponent } from './product-tab/product-tab.component';

@NgModule({
  declarations: [
    // directives
    ClickOutsideDirective,
    AutoFocusDirective,
    // componnts
    SimpleSearchComponent,
    MainToolbarComponent,
    MessageComponent,
    TimeFieldComponent,
    UploadFilesComponent,
    DoubleButtonComponent,
    ButtonSelectComponent,
    SortBtnComponent,
    BackButtonComponent,
    MultiEmailFieldComponent,
    DropLabelComponent,
    UploadAvatarComponent,
    CreditCardMaskPipe,
    StatusButtonComponent,
    EmptyDataComponent,
    MainNavigationComponent,
    ProductTabComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
    PerfectScrollbarModule,
    RouterModule,
    NgxMaskModule,
    GridsterModule,
    ChartsModule,
    TranslateModule
  ],
  exports: [
    SimpleSearchComponent,
    MainToolbarComponent,
    MessageComponent,
    TimeFieldComponent,
    UploadFilesComponent,
    DoubleButtonComponent,
    ButtonSelectComponent,
    SortBtnComponent,
    MultiEmailFieldComponent,
    DropLabelComponent,
    UploadAvatarComponent,
    CreditCardMaskPipe,
    StatusButtonComponent,
    EmptyDataComponent,
    MainNavigationComponent,
    ProductTabComponent
       
  ],
})
export class SharedModule { }
