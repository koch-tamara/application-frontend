import { inject, Pipe, PipeTransform } from '@angular/core';
import { Paragraph } from '../data/introduction';
import { LocalizationService } from '../services/localization.service';
import { Localized } from '../../../projects/time-line/src/public-api';

@Pipe({
  name: 'getFormattedContent',
  standalone: true,
})
export class GetFormattedContentPipe implements PipeTransform {
  private i18n = inject(LocalizationService);

  transform(value: Localized<Paragraph[]>): string {
    const content: Paragraph[] = this.i18n.get<Paragraph[]>(value);
    const contentWithProperSentenceEnding = content.map(p => p.map(s => s.endsWith('.') ? s : s + '.').join(' '));
    return contentWithProperSentenceEnding.map(p => `<p>${p}</p>`).join(' ');
  }

}
