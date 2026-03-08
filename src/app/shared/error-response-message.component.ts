import { Component, inject, Input } from '@angular/core';
import { ErrorResponseService } from '../services/error-response.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-error-response-message',
  imports: [],
  template: `
  <div class="error-message-container">
    {{ error.message || '--' }}
  </div>
  `,
  styles: [`
    :host {
      height: 100%;
    }
    .error-message-container {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 100%;
    }

  `],
  providers: []
})
export class ErrorResponseMessageComponent {
  @Input({ required: true}) error!: HttpErrorResponse;
  // ToDo: TEST
}
