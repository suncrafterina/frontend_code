import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class MessageService {
    
    private messageSource = new BehaviorSubject<string>(this.translate.instant('Common.Dashboard'));
    
    currentMessage = this.messageSource.asObservable();

    private selectedProfile = new Subject<any>();
    selectedProfile$ = this.selectedProfile.asObservable();

    private selectLanguage = new Subject<any>();
    selectLanguage$ = this.selectLanguage.asObservable();
    
    //pagination click event
    private pageChanged = new Subject<any>();
    pageChanged$ = this.pageChanged.asObservable();
    
    constructor(public translate: TranslateService) { 
        //this.selectLanguage.next('zh-Hans');
     }
    
    changeMessage(message: string) {
        this.messageSource.next(message);
    }
    
    updateSelectedProfile(item)
    {
       this.selectedProfile.next(item);
    }
    updateSelectedLanguage(item)
    {
        this.selectLanguage.next(item);
    }
    
    updatePageChanged(item)
    {
       this.pageChanged.next(item);
    }
        
}