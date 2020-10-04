import { Component, OnInit, Input } from '@angular/core';
import { SlideInOutAnimation } from 'src/app/shared/functions/animate';

@Component({
  selector: 'app-warning-info-block',
  templateUrl: './warning-info-block.component.html',
  styleUrls: ['./warning-info-block.component.scss'],
  animations: [SlideInOutAnimation],
})
export class WarningInfoBlockComponent implements OnInit {
  @Input() title: string;
  isOpen = true;
  show = true;

  constructor() {}

  ngOnInit() {}

  // close function
  closeBox() {
    this.isOpen = false;
    setTimeout(() => {
      this.show = false;
    }, 250);
  }
  // end of close function
}
