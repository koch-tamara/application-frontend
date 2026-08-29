import { Component, computed, inject } from '@angular/core';
import { ImageInformation, PageLayout } from 'page-layout';
import { DataService } from '../../services/data.service';
import { Content, Place, TimeLine } from '../../../../projects/time-line/src/public-api';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';
import { createDate } from '../../utils/create-date';

@Component({
  imports: [PageLayout, TimeLine, LoadingSpinnerComponent],
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  providers: []
})
export class ExperienceComponent {
  private dataService = inject(DataService);

  signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_horizontal.png',
  }

  content = computed(() => {
    const experienceList = this.dataService.experience();

    if (experienceList == undefined)
      return [];

    return experienceList.map(entry => {
      return new Content(
        new Place(entry.company.name, entry.company.address),
        createDate(entry.from, entry.dateFormat),
        entry.to ? createDate(entry.to, entry.dateFormat) : undefined,
        entry.downloads,
        entry.employedAs);
    })
  });
}
