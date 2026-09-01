import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';
import { GetListedSkillsPipe } from '../../pipes/get-listed-skills.pipe';
import { SkillsAssessmentComponent } from './skills-assessment/skills-assessment.component';

@Component({
  selector: 'app-skills',
  imports: [
    SkillsAssessmentComponent,
    LoadingSpinnerComponent,
    GetListedSkillsPipe
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  dataService = inject(DataService);
}
