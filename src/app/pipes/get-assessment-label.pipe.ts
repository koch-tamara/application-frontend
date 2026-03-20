import { inject, Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from '../services/localization.service';
import { Localized } from '../../../projects/time-line/src/lib/classes/Localized';

@Pipe({
  name: 'getAssessmentLabel',
})
export class GetAssessmentLabelPipe implements PipeTransform {
  private i18n = inject(LocalizationService);

  transform(label: Localized<string>): unknown {
    return this.i18n.get(label);
  }

}
