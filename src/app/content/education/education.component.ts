import { Component, computed, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ImageInformation, PageLayout } from 'page-layout';
import { DataService } from '../../services/data.service';
import { map } from 'rxjs';
import { Content, Place, TimeLine } from '../../../../projects/time-line/src/public-api';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';
import { Education } from '../../data/ecucation';
import { createDate } from '../../utils/create-date';

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
  content = computed(() => {
    const educationList = this.dataService.education();

    if (!educationList)
      return [];

    return educationList.map(entry =>
      new Content(
        new Place(entry.school.name, entry.school.address),
        createDate(entry.from, entry.dateFormat),
        entry.to ? createDate(entry.to, entry.dateFormat) : undefined,
        entry.downloads,
        entry.subject,
        entry.degree
      )
    );
  });
}
