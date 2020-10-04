import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-select',
  templateUrl: './button-select.component.html',
  styleUrls: ['./button-select.component.scss'],
})
export class ButtonSelectComponent implements OnInit {
  @Output() change = new EventEmitter();
  @Input() value = '';
  @Input() items = [];

  stringItems = [];

  constructor() {}

  ngOnInit() {
    for (const item of this.items) {
      item.name
        ? this.stringItems.push(item.name)
        : this.stringItems.push(item);
    }

    if (!this.value) {
      this.value = this.stringItems[0];
    }
  }

  clickFunction = val => {
    this.value = val;
    this.change.emit(val);
  };
}
