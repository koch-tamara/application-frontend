import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ImageInformation, PageLayout } from 'page-layout';
import { DataService } from '../../services/data.service';
import { map } from 'rxjs';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';
import { GetCompleteNamePipe } from '../../pipes/get-complete-name.pipe';
import { DatePipe } from '@angular/common';
import { UseCorrectLanguagePipe } from '../../pipes/use-correct-language.pipe';

@Component({
  selector: 'app-contact',
  imports: [PageLayout, DatePipe, LoadingSpinnerComponent, GetCompleteNamePipe, UseCorrectLanguagePipe],
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
      data.info.address = data.info.address.replace(/,\s*/g, "<br>");
      return data.info;
    })
  ));
}
