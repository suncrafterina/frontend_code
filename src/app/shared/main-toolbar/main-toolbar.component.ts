import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss'],
})
export class MainToolbarComponent implements OnInit {
  @Input() backBtnFlag: false;
  @Input() newNotifications: string;
  @Input() title: string;
  @Input() notifications = false;

  @Output() menuToggle = new EventEmitter<boolean>();
  @Output() notificationsToggle = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  toggleMenu = () => this.menuToggle.emit();

  toggleNotifications = () => this.notificationsToggle.emit();
}
