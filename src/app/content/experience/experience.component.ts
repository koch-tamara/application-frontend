import { Component, computed, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TimeLine } from '../../../../projects/time-line/src/public-api';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';
import { createDate } from '../../utils/create-date';
import { Event, Place } from 'shared-models';

@Component({
  imports: [TimeLine, LoadingSpinnerComponent],
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  providers: []
})
export class ExperienceComponent {
  private dataService = inject(DataService);

  content = computed(() => {
    const experienceList = this.dataService.experience();

    if (experienceList == undefined)
      return [];

    return experienceList.map(entry => {
      return new Event(
        new Place(entry.company.name, entry.company.address),
        createDate(entry.from, entry.dateFormat),
        entry.to ? createDate(entry.to, entry.dateFormat) : undefined,
        entry.downloads,
        entry.employedAs);
    })
  });
}
