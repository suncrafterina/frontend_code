import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

import { History } from 'src/app/interfaces/shared';

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.scss'],
})
export class SimpleSearchComponent implements OnInit {
  @ViewChild('focusable', { static: false, read: MatAutocompleteTrigger })
  focusable: MatAutocompleteTrigger;
  focusFlag = false;
  openFlag = false;
  @Input() data = '';
  ignoredFirstEvent = false;
  @Input() closeButton = false;
  @Input() placeholder = '';
  @Input() history: Array<History> = [
    /*{
      value: '5302893',
      category: 'Tracking #',
    },
    {
      value: 'Test ABC INC.',
      category: 'Customer',
    },
    {
      value: 'Canada Post',
      category: 'Carrier',
    },
    {
      value: 'Canada Post',
      category: 'Carrier',
    },*/
  ];

  searchControl = new FormControl();

  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if((!(this.data == null || this.data.length === 0)))
      this.openFlag = true;
  }

  openSearch = (e, el) => {
    this.openFlag = true;
    setTimeout(() => {
      this.focusable.openPanel();
    }, 300);
    el.focus();
    return false;
  };

  changeFunction(data: string) {
    if (this.ignoredFirstEvent) {
      this.backData(data);
      if ((!(data == null || data.length === 0))) {
        //this.focusable.closePanel();
      }    
    }
    this.ignoredFirstEvent = true;
  }
  focus() {
    this.focusFlag = true;
  }
  blur() {
    this.focusFlag = false;
    setTimeout(() => {
      if (this.searchControl.value === '') {
        this.openFlag = false;
      }
    }, 300);
  }

  backData = data => this.change.emit(data);

  cancelFunction = () => {
    this.openFlag = false;
    this.data = '';
  };
}
