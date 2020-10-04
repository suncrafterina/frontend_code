import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable()
export class NotificationsService {
  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any> {
    return this.http
      .get('../../../content/data/notifications.json')
      .pipe(map(data => data));
  }
}
