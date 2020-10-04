import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Notification } from 'src/app/interfaces/shared';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [NotificationsService],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  subscribe = new Subscription();
  @Output() closeNotificationSidebar = new EventEmitter<boolean>();
  notificationsSettingsPath = '/admin/profile/notification-settings';
  notifications: Array<Notification>;
  snoozeFlag: number;
  openedSzone: number;
  szoones = ['1 Hour', '1 Day', '1 Week'];

  constructor(private getData: NotificationsService) {}

  ngOnInit() {
    // get notifications
    this.subscribe.add(
      this.getData.getNotifications().subscribe(data => {
        this.notifications = data;
        let n = 0;
        for (const i of this.notifications) {
          if (i.new) {
            n++;
          }
        }
        const newNotifications = n.toString();
        localStorage.setItem('newnotifications', newNotifications);
      })
    );
  }

  // close notifications
  closeSidebar = () => this.closeNotificationSidebar.emit();

  // szone
  toggleSnooze(index) {
    this.snoozeFlag =
      index !== this.openedSzone || this.snoozeFlag !== index ? index : 0;
  }
  setOpenedSnooze = index => (this.openedSzone = index);

  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
}
