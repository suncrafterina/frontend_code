import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort-btn',
  templateUrl: './sort-btn.component.html',
  styleUrls: ['./sort-btn.component.scss'],
})
export class SortBtnComponent implements OnInit {
  @Input() sortMenu = ['Latest'];
  @Output() sortData = new EventEmitter();
  currentItem: string;
  @Input() sortDirection = false;

  constructor() { }

  // name - string
  // direction - boolean (true: up, false: down)
  sort(name, direction) {
    const sort = {
      name: name,
      direction: direction,
    };
    this.sortData.emit(sort);
  }

  ngOnInit() {
    this.currentItem = this.sortMenu[0];
  }
}
