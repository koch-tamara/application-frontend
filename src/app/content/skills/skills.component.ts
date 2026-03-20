import { Component, inject } from '@angular/core';
import { ImageInformation, PageLayout } from 'page-layout';
import { SkillsAssessmentComponent } from '../../shared/skills-assessment/skills-assessment.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-skills',
  imports: [PageLayout, SkillsAssessmentComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  private dataService = inject(DataService);

  signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_vertical.png',
  }

  skills = toSignal(this.dataService.getSkillsData());
}
