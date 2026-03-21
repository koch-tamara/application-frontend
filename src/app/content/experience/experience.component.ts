import { Component, inject } from '@angular/core';
import { ImageInformation, PageLayout } from 'page-layout';
import { DataService } from '../../services/data.service';
import { map } from 'rxjs';
import { Content, Place, TimeLine } from '../../../../projects/time-line/src/public-api';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';

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

  content = toSignal(this.dataService.getExperienceData()
    .pipe(map((experience) => experience.map(entry => {
      return new Content(
        new Place(entry.company.name, entry.company.address),
        new Date(entry.from),
        entry.to ? new Date(entry.to) : undefined,
        entry.downloads,
        entry.employedAs);
    }))));
}
