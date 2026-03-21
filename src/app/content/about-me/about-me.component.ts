import { Component, inject } from '@angular/core';
import { ImageInformation, PageLayout } from 'page-layout';
import { DataService } from '../../services/data.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { GetFormattedContentPipe } from '../../pipes/get-formatted-content.pipe';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';
import { StatementCardComponent } from './statement-card/statement-card.component';

@Component({
  selector: 'app-about-me',
  imports: [PageLayout, GetFormattedContentPipe, LoadingSpinnerComponent, StatementCardComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  private dataService = inject(DataService);

  signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_vertical.png',
  }

  data = toSignal(this.dataService.getPersonalInformation());
}
