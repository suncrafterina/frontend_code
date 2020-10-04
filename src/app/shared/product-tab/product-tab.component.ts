import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-product-tab',
  templateUrl: './product-tab.component.html',
  styleUrls: ['./product-tab.component.scss']
})
export class ProductTabComponent implements OnInit {
  @Input() infostatus: string;
  @Input() productId: string;
  @Input() currentTab: string;
  @Input() addNew: number;
  constructor() { }

  ngOnInit(): void {
   
   
  }

}
