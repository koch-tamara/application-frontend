import { inject, Pipe, PipeTransform } from '@angular/core';
import { Localized } from '../../../projects/time-line/src/public-api';
import { LocalizationService } from '../services/localization.service';

@Pipe({
  name: 'useCorrectLanguage',
})
export class UseCorrectLanguagePipe implements PipeTransform {

  private i18n = inject(LocalizationService);

  transform(value: Localized<string>): string {
    return this.i18n.get(value);
  }
}
