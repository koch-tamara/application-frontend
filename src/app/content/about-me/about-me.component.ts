import { Component } from '@angular/core';
import { ImageInformation, PageLayout } from 'page-layout';

@Component({
  selector: 'app-about-me',
  imports: [PageLayout],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {

signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_vertical.png',
  }

}
