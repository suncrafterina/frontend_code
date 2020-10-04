import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss'],
})
export class UploadAvatarComponent implements OnInit {
  click = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  uploadAvatar = () => this.click.emit();
}
