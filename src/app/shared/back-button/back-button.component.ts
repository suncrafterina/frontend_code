import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {
  @Input() light = false;

  constructor(private location: Location, private router: Router) {}

  ngOnInit() {}

  goBack(): void {
  	this.location.back();
  }
}
