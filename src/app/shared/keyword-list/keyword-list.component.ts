import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keyword-list',
  templateUrl: './keyword-list.component.html',
  styleUrls: ['./keyword-list.component.scss'],
})
export class KeywordListComponent implements OnInit {
  @Input() keywords = [];
  @Output() change = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  removeItem(index) {
    this.keywords.splice(index, 1);
    this.change.emit(this.keywords);
  }
}
