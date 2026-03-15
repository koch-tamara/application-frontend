import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ImageInformation, PageLayout } from 'page-layout';
import { DataService } from '../../services/data.service';
import { LoadingService } from '../../services/loading.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';
import { ErrorResponseService } from '../../services/error-response.service';
import { ErrorResponseMessageComponent } from '../../shared/error-response-message.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { GetIntroductionHeaderPipe } from '../../pipes/get-introduction-header.pipe';
import { GetClosingPipe } from '../../pipes/get-closing.pipe';
import { GetFormattedContentPipe } from '../../pipes/get-formatted-content.pipe';

@Component({
  selector: 'app-introduction',
  imports: [
    PageLayout,
    DatePipe,
    LoadingSpinnerComponent,
    ErrorResponseMessageComponent,
    GetIntroductionHeaderPipe,
    GetClosingPipe,
    NgTemplateOutlet,
    GetFormattedContentPipe
  ],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
  providers: [LoadingService, ErrorResponseService]
})
export class IntroductionComponent {

  errorService = inject(ErrorResponseService);
  private dataService = inject(DataService);
  private loadingService = inject(LoadingService);

  uiIntroductionState = computed(() => {
    if (this.loadingService.loading()) return 'loading';
    if (this.errorService.inErrorState()) return 'error';
    if (this.data()) return 'ready';
    return 'empty';
  });

  signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_vertical.png',
  }

  data = toSignal(this.dataService.getIntroductionData());
}
