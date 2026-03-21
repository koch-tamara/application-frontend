import { Component, Input } from '@angular/core';
import { Statement } from '../../../data/about-me';
import { UseCorrectLanguagePipe } from '../../../pipes/use-correct-language.pipe';

@Component({
  selector: 'app-statement-card',
  imports: [UseCorrectLanguagePipe],
  templateUrl: './statement-card.component.html',
  styleUrl: './statement-card.component.scss',
})
export class StatementCardComponent {
  @Input({ required: true }) statement!: Statement;
}
