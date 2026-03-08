import { HttpErrorResponse } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorResponseService {
  error = signal<HttpErrorResponse | undefined>(undefined);
  inErrorState = computed(() => !!this.error());

  setError(response: HttpErrorResponse) {
    this.error.set(response);
  }

  clear() {
    this.error.set(undefined);
  }
}
