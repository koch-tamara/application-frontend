import { inject, Pipe, PipeTransform } from '@angular/core';
import { Name } from '../data/about-me';
import { LocalizationService } from '../services/localization.service';

@Pipe({
  name: 'getCompleteName',
})
export class GetCompleteNamePipe implements PipeTransform {
  private i18n = inject(LocalizationService);

  transform(name: Name): string {
    const emptySpace = ' ';
    const firstAndLastName = name.firstName + emptySpace + name.lastName;

    if (!name.née || name.née === name.lastName) {
      return firstAndLastName;
    }

    return firstAndLastName + '<br>' + this.i18n.get({ de: 'geborene', en: 'née' }) + emptySpace + this.markAsBold(name.née);
  }

  private markAsBold(text: string) {
    return '<strong>' + text + '</strong>';
  }

}
