import { Pipe, PipeTransform } from '@angular/core';
import { ImageInformation } from '../data';

@Pipe({
  name: 'getImageSource'
})
export class GetImageSourcePipe implements PipeTransform {

  transform(imageInfo: ImageInformation): string {
    return `${imageInfo.relativePath}/${imageInfo.imageName}.${imageInfo.imageFormat}`;
  }

}
