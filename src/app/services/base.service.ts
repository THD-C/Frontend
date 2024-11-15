import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { ObservableInput, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  static readonly notificationOverride = {
    timeOut: 9000,
  };

  readonly defaultError = {
    title: 'Error',
    message: 'Unknown error occurred. Refresh page and try again.'
  };

  constructor(protected readonly notificationsService: NotificationsService) { }
  
  generateParams(filters?: unknown): HttpParams {
    let params = new HttpParams();

    if (!filters) {
      return params;
    }

    for (const [name, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        if (value instanceof Array) {
          value.forEach(v => {
            params = params.append(name, v);
          });
        } else {
          params = params.set(name, value as string | number | boolean);
        }
      }
    }

    return params;
  }

  catchCustomError(error: HttpErrorResponse): ObservableInput<void> {
    if (error.status === 401) {
      return throwError(() => new Error('Unauthorized call. Please, sign in'));
    }

    const message = error.error ?? this.defaultError.message;
    this.notificationsService.error(
      this.defaultError.title,
      message,
      BaseService.notificationOverride
    );

    return throwError(() => new Error(message));
  }

  getFormData(data?: unknown): FormData {
    const formData = new FormData();

    if (!data) {
      return formData;
    }

    for (const [name, value] of Object.entries(data)) {
      formData.append(name, `${value}`);
    }

    return formData;
  }
  
}
