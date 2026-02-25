import { Component, inject } from '@angular/core';
import { ImageInformation, PageLayout } from 'page-layout';
import { DataService } from '../../services/data.service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Content, Place, TimeLine } from '../../../../projects/time-line/src/public-api';

@Component({
  imports: [PageLayout, TimeLine, AsyncPipe],
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

  content$ = this.dataService.getExperienceData()
    .pipe(map((experience) => experience.map(entry => {
        return new Content(
          new Place(entry.company.name, entry.company.address), 
          new Date(entry.from), 
          entry.to ? new Date(entry.to) : undefined, 
          entry.downloads, 
          entry.employedAs);
      })));
}
