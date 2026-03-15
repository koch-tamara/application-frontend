import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Assessment } from "../../data/skills";
import { GetAssessmentLabelPipe } from '../../pipes/get-assessment-label.pipe';

@Component({
  selector: 'app-skills-assessment',
  imports: [NgTemplateOutlet, NgClass, GetAssessmentLabelPipe],
  templateUrl: './skills-assessment.component.html',
  styleUrl: './skills-assessment.component.scss',
})
export class SkillsAssessmentComponent {
  @Input() assessments: Assessment[] = [];
  maxRating = 5;
  ratingRange = Array.from({ length: this.maxRating }, (_, i) => i);
}
