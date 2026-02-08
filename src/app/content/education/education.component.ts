import { Component, inject } from '@angular/core';
import { ImageInformation, PageLayout } from 'page-layout';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-education',
  imports: [PageLayout],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {

  signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_horizontal.png',
  }
  dataService = inject(DataService);
}
