import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  config = {};
  constructor(public toastr: ToastrService) {
    this.config = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '10000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut'
    };
  }

  // https://codeseven.github.io/toastr/demo.html

  success(title, message) {
    this.toastr.clear();
    this.toastr.success(message, title, this.config);
  }

  error(title, message) {
    this.toastr.clear();
    this.toastr.error(message, title, this.config);
  }

  warning(title, message) {
    this.toastr.clear();
    this.toastr.warning(message, title, this.config);
  }

  info(title, message) {
    this.toastr.clear();
    this.toastr.info(message, title, this.config);
  }

  clear() {
    this.toastr.clear();
  }
  onAlert(id)
  {

  }
}
