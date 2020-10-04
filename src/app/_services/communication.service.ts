import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private showLoader = new Subject<any>();
  showLoaderObservable$ = this.showLoader.asObservable();
  newNotification = new Subject<any>();
  newNotificationObservable$ = this.newNotification.asObservable();
  refreshNotification = new Subject<any>();
  refreshNotificationObservable$ = this.refreshNotification.asObservable();
  constructor() {}

  public notifyShowHideLoader(data: any) {
    if (data) {
      this.showLoader.next(data);
    }
  }
}
