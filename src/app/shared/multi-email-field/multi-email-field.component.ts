import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-multi-email-field',
  templateUrl: './multi-email-field.component.html',
  styleUrls: ['./multi-email-field.component.scss'],
})
export class MultiEmailFieldComponent implements OnInit {
  @Input() label: string;
  @Output() valueChange = new EventEmitter();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private emails: Array<string>;

  constructor() {}

  ngOnInit() {}

  @Input()
  get value(): any {
    return this.valueGetter();
  }
  set value(value: any) {
    this.valueSetter(value);
  }

  protected valueGetter() {
    return this.emails;
  }

  protected valueSetter(value: any) {
    this.emails = value;
    this.valueChange.emit(this.emails);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add
    if ((value || '').trim()) {
      this.emails.push(value.trim());
      console.log(this.emails);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(email): void {
    const index = this.emails.indexOf(email);
    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }
}
