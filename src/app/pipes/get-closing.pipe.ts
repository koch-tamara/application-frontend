import { inject, Pipe, PipeTransform } from '@angular/core';
import { Greeting } from '../data/introduction';
import { LocalizationService } from '../services/localization.service';

@Pipe({
  name: 'getClosing',
  standalone: true,
})
export class GetClosingPipe implements PipeTransform {
  private i18n = inject(LocalizationService);

  transform(value?: Greeting): string {
    return value
      ? this.i18n.get(value)
      : this.i18n.get({
        de: 'Mit freundlichen Grüßen',
        en: 'Yours sincerly'
      });
  }
}
