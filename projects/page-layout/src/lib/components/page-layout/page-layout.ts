import { Component, Input, signal } from '@angular/core';
import { ImageInformation } from '../../data';

@Component({
  selector: 'lib-page-layout',
  imports: [],
  templateUrl: "./page-layout.html",
  styleUrl: "./page-layout.scss",
})
export class PageLayout {
  imageInfo = signal<ImageInformation | undefined>(undefined);
  @Input() set image(imageInfo: ImageInformation | undefined){
    if (imageInfo) {
      this.imageInfo.set(imageInfo);
    }
  }
  
}
