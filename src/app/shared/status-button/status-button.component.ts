import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { STATUSES } from 'src/app/shared/const/dropdowns';

@Component({
  selector: 'app-status-button',
  templateUrl: './status-button.component.html',
  styleUrls: ['./status-button.component.scss'],
})
export class StatusButtonComponent implements OnInit {
  @Output() change = new EventEmitter();
  @Input() status = 'Pending'; // default state
  @Input() statuses = STATUSES;

  constructor() {}

  ngOnInit() {}

  changeStatus(item) {
    this.status = item;
    this.change.emit(item);
  }
}
