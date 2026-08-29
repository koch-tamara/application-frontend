import { Component, inject } from '@angular/core';
import { ImageInformation, PageLayout } from 'page-layout';
import { DataService } from '../../services/data.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';
import { UseCorrectLanguagePipe } from '../../pipes/use-correct-language.pipe';
import { MatIconModule } from '@angular/material/icon';
import { InternationalPhoneFormatPipe } from '../../pipes/international-phone-format.pipe';

@Component({
  selector: 'app-contact',
  imports: [
    PageLayout,
    LoadingSpinnerComponent,
    UseCorrectLanguagePipe,
    InternationalPhoneFormatPipe,
    MatIconModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  dataService = inject(DataService);

  signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_vertical.png',
  }
}
