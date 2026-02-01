import { Component, Input, signal } from '@angular/core';
import { NgIf } from "../../../../../../node_modules/@angular/common/types/_common_module-chunk";
import { ImageInformation } from '../../data';
import { GetImageSourcePipe } from '../../pipes/get-image-source.pipe';

@Component({
  selector: 'lib-page-layout',
  imports: [GetImageSourcePipe],
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
