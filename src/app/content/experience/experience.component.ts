import { Component } from '@angular/core';
import { ImageInformation, PageLayout } from 'page-layout';

@Component({
  selector: 'app-experience',
  imports: [PageLayout],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {

  signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_horizontal.png',
  }
}
