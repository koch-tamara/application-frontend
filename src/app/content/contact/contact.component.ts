import { Component } from '@angular/core';
import { ImageInformation, PageLayout } from 'page-layout';

@Component({
  selector: 'app-contact',
  imports: [PageLayout],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {

  signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_vertical.png',
  }
}
