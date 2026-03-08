import { inject, Pipe, PipeTransform } from '@angular/core';
import { Contact, ESex } from '../data/introduction';
import { LocalizationService } from '../services/localization.service';

@Pipe({
  name: 'getIntroductionHeader',
  standalone: true
})
export class GetIntroductionHeaderPipe implements PipeTransform {
  private i18n = inject(LocalizationService);

  transform(value?: Contact): string {
    if (!value) {
      return this.i18n.get({
        de: 'Sehr geehrte Damen und Herren',
        en: 'Dear Sir or Madam'
      }) + ',';
    }

    const header = value.sex === ESex.male
      ? this.i18n.get({ 
        de: `Sehr geehrter Herr ${value.lastName}`, 
        en: `Dear Mr ${value.lastName}`
      })
      : this.i18n.get({ 
        de: `Sehr geehrte Frau ${value.lastName}`, 
        en: `Dear Ms ${value.lastName}`
      });
    return header + ',';
  }

}
