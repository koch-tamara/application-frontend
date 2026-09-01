import { Component, computed, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Event, Place } from 'shared-models';
import { TimeLine } from '../../../../projects/time-line/src/public-api';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';
import { createDate } from '../../utils/create-date';

@Component({
  selector: 'app-education',
  imports: [TimeLine, LoadingSpinnerComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  private dataService = inject(DataService);

  content = computed(() => {
    const educationList = this.dataService.education();

    if (!educationList)
      return [];

    return educationList.map(entry =>
      new Event(
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
