import { inject, Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from '../services/localization.service';
import { Localized } from '../../../projects/time-line/src/public-api';

@Pipe({
  name: 'getClosing',
  standalone: true,
})
export class GetClosingPipe implements PipeTransform {
  private i18n = inject(LocalizationService);

  transform(value?: Localized<string>): string {
    return value
      ? this.i18n.get(value)
      : this.i18n.get({
        de: 'Mit freundlichen Grüßen',
        en: 'Yours sincerly'
      });
  }
}
