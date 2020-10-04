import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import {  MessageService } from './_services/message.service';
@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private accountService: AccountService, private translate: TranslateService,private _messageService: MessageService) {
        this.accountService.user.subscribe(x => this.user = x);
        translate.addLangs(['en', 'ch']);
        translate.setDefaultLang('en');
    }
    logout() {
        this.accountService.logout();
    }
    useLanguage(language: string) {
        //this.translate.use(language);
    }
}