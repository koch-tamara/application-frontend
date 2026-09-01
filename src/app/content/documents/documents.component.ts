import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';
import { DownloadItemComponent } from './download-item/download-item.component';
import { DownloadInformation } from 'shared-models';
import { UseCorrectLanguagePipe } from '../../pipes/use-correct-language.pipe';

@Component({
  selector: 'app-documents',
  imports: [LoadingSpinnerComponent, DownloadItemComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {
  dataService = inject(DataService);
  private useCorrectLanguage = new UseCorrectLanguagePipe();

  curriculumVitae = {
    en: 'curriculumVitae',
    de: 'Lebenslauf'
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
