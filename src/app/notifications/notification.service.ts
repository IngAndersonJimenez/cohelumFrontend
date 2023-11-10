import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(menssage: string, complementMessage: string) {
    this.toastr.success(menssage, complementMessage);
  }

  showInfo(menssage: string, complementMessage: string) {
    this.toastr.info(menssage, complementMessage);
  }

  showWarning(menssage: string, complementMessage: string) {
    this.toastr.warning(menssage, complementMessage);
  }

  showError(menssage: string, complementMessage: string) {
    this.toastr.error(menssage, complementMessage);
  }

}
