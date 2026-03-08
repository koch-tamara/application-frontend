import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `<div class="loading-bar"></div>`,
  styles: [`
    .loading-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      width: 100%;
      background: linear-gradient(90deg, #3f51b5, #2196f3);
      animation: loading 1.2s infinite;
      z-index: 9999;
    }

    @keyframes loading {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `]
})
export class LoadingSpinnerComponent {
  // ToDo: TEST
}
