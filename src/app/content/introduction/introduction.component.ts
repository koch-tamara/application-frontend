import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoadingService } from '../../services/loading.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';
import { ErrorResponseService } from '../../services/error-response.service';
import { ErrorResponseMessageComponent } from '../../shared/error-response-message.component';
import { GetFormattedContentPipe } from '../../pipes/get-formatted-content.pipe';

@Component({
  selector: 'app-introduction',
  imports: [
    LoadingSpinnerComponent,
    ErrorResponseMessageComponent,
    NgTemplateOutlet,
    GetFormattedContentPipe
  ],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
  providers: [LoadingService, ErrorResponseService]
})
export class IntroductionComponent {

  errorService = inject(ErrorResponseService);
  dataService = inject(DataService);
  private loadingService = inject(LoadingService);

  uiIntroductionState = computed(() => {
    // toDo: use a ui state enum 
    if (this.loadingService.loading()) return 'loading';
    if (this.errorService.inErrorState()) return 'error';
    if (this.dataService.introduction()) return 'ready';
    return 'empty';
  });
}
