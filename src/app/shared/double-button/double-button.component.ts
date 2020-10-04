import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-double-button',
  templateUrl: './double-button.component.html',
  styleUrls: ['./double-button.component.scss'],
})
export class DoubleButtonComponent implements OnInit {
  @Input() bigger = false;
  @Input() disabled = false;
  @Input() items = ['Button 1', 'Button 1'];
  @Input() defaultValue = this.items[0];
  @Output() change = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  clickOnBtn = button => this.change.emit(button);
}
