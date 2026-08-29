import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ImageInformation, PageLayout } from 'page-layout';
import { DataService } from '../../services/data.service';
import { map } from 'rxjs';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';
import { DatePipe } from '@angular/common';
import { UseCorrectLanguagePipe } from '../../pipes/use-correct-language.pipe';
import { MatIconModule } from '@angular/material/icon';
import { InternationalPhoneFormatPipe } from '../../pipes/international-phone-format.pipe';

@Component({
  selector: 'app-contact',
  imports: [
    PageLayout,
    DatePipe,
    LoadingSpinnerComponent,
    UseCorrectLanguagePipe,
    InternationalPhoneFormatPipe,
    MatIconModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private dataService = inject(DataService);

  signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_vertical.png',
  }

  data = toSignal(this.dataService.getPersonalInformation().pipe(
    map(data => {
      data.info.birthDate = new Date(data.info.birthDate);
      return data.info;
    })
  ));
}
