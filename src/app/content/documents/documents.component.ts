import { Component, inject } from '@angular/core';
import { ImageInformation, PageLayout } from 'page-layout';
import { DataService } from '../../services/data.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';
import { DownloadItemComponent } from './download-item/download-item.component';
import { DownloadInformation } from '../../../../projects/time-line/src/public-api';
import { UseCorrectLanguagePipe } from '../../pipes/use-correct-language.pipe';

@Component({
  selector: 'app-documents',
  imports: [PageLayout, LoadingSpinnerComponent, DownloadItemComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {
  private dataService = inject(DataService);
  private useCorrectLanguage = new UseCorrectLanguagePipe();

  signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_vertical.png',
  }
  generalLabels = {
    coverLetter: {
      en: 'Cover letter',
      de: 'Bewerbungsschreiben'
    },
    curriculumVitae: {
      en: 'curriculumVitae',
      de: 'Lebenslauf'
    }
  }

  downloads = toSignal(this.dataService.getAllDocuments());

  onDownloadCoverLetter() {
    // ToDo: create cover letter when all tabs have been finished (all information are available)
    console.log('add cover letter');
  }

  onDownloadCurriculumVitae() {
    // ToDo: create curriculum vitae when all tabs have been finished (all information are available)
    console.log('add curriculum vitae');
  }

  onDownload(download: DownloadInformation) {
    const a = document.createElement("a");
    a.href = `${download.path}.pdf`;
    a.download = `${this.useCorrectLanguage.transform(download.label)}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}
