import { Injectable } from '@angular/core';
import Swal, { SweetAlertType } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class SwalService {
  public constructor() {

  }

  public showConfirmDialog(params: { title?: string, text?: string, type?: SweetAlertType, showCancelButton?: boolean, confirmButtonText?: string } = {}
  ) {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes!'
    });
  }

  public showBasicAlert(params: any = {}) {
    return Swal.fire(
      params.title ? params.title : 'Success!',
      params.message ? params.message : 'Your request has been registered. Our staff will contact you!',
      params.type ? params.type : 'success');
  }

  public showErrorAlert(params: any = {}) {
    return Swal.fire(
      'Error occurred!',
      params.message ? params.message : 'Error occurred while processing the request!',
      'error');
  }

  public showWarningAlert(params: any = {}) {
    return Swal.fire(
      'Warning!',
      params.message ? params.message : 'Something went wrong!',
      'warning');
  }
}
