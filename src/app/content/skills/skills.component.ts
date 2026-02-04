import { Component } from '@angular/core';
import { ImageInformation, PageLayout } from 'page-layout';

@Component({
  selector: 'app-skills',
  imports: [PageLayout],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {

  signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_vertical.png',
  }
}
