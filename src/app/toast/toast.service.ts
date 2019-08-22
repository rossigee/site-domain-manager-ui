import { Injectable, TemplateRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  httpError(error: HttpErrorResponse) {
    this.toasts.push({
      textOrTpl: error.message,
      classname: 'bg-danger text-light',
      autohide: false,
      type: "Error"
    });
  }

  error(message: string) {
    this.toasts.push({
      textOrTpl: message,
      classname: 'bg-danger text-light',
      autohide: false,
      type: "Error"
    });
  }

  notice(message: string) {
    this.toasts.push({
      textOrTpl: message,
      classname: 'bg-notice',
      autohide: false,
      type: "Notice"
    });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
