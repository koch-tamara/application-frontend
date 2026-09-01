import { inject, Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from '../services/localization.service';
import { Localized } from 'shared-models';

@Pipe({
  name: 'getListedSkills',
})
export class GetListedSkillsPipe implements PipeTransform {
  private i18n = inject(LocalizationService);

  transform(skills: { label: Localized<string> }[]): string {
    skills.map(skill => this.i18n.get<string>(skill.label));
    return skills.join(', ');
  }
}
