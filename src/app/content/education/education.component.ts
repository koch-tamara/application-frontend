import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ImageInformation, PageLayout } from 'page-layout';
import { DataService } from '../../services/data.service';
import { map } from 'rxjs';
import { Content, Place, TimeLine } from '../../../../projects/time-line/src/public-api';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';

@Component({
  selector: 'app-education',
  imports: [PageLayout, TimeLine, LoadingSpinnerComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  private dataService = inject(DataService);

  signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_horizontal.png',
  }
  content = toSignal(this.dataService.getEducationData()
    .pipe(map((education) => education.map(entry => {
      return new Content(
        new Place(entry.school.name, entry.school.address),
        new Date(entry.from),
        entry.to ? new Date(entry.to) : undefined,
        entry.downloads,
        entry.subject,
        entry.degree);
    }))));
}
