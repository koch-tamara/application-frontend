import { inject, Pipe, PipeTransform } from '@angular/core';
import { IntroductionContent, Paragraph } from '../data/introduction';
import { LocalizationService } from '../services/localization.service';

@Pipe({
  name: 'getFormattedContent',
  standalone: true,
})
export class GetFormattedContentPipe implements PipeTransform {
  private i18n = inject(LocalizationService);
  
  transform(value: IntroductionContent): string {
    const content: Paragraph[] = this.i18n.get(value);
    const contentWithProperSentenceEnding = content.map(p => p.map(s => s.endsWith('.') ? s : s + '.').join(' '));
    return contentWithProperSentenceEnding.map(p => `<p>${p}</p>`).join(' ');
  }

}
