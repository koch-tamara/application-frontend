import { HttpInterceptorFn, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ErrorResponseService } from '../error-response.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const errorService = inject(ErrorResponseService);
  errorService.clear();

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      errorService.setError(error);
      return throwError(() => error);
    }),
    tap((event) => {
      if (event instanceof HttpResponse) {
        errorService.clear();
      }
    })
  );
};