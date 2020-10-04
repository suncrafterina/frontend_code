import { Component, OnInit, Input } from '@angular/core';
import { SlideInOutAnimation } from 'src/app/shared/functions/animate';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [SlideInOutAnimation],
})
export class MessageComponent implements OnInit {
  checked = false;
  @Input() isOpen = true;

  @Input() checkboxText = '';

  constructor() {}

  ngOnInit() {
    this.checked ? (this.isOpen = false) : (this.isOpen = true);
  }

  closeMessage = () => (this.isOpen = false);

  checkboxFunction(checked) {
    console.log(checked);
  }
}
