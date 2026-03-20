import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Localized } from '../../../../../projects/time-line/src/public-api';
import { UseCorrectLanguagePipe } from '../../../pipes/use-correct-language.pipe';

@Component({
  selector: 'app-download-item',
  imports: [UseCorrectLanguagePipe],
  templateUrl: './download-item.component.html',
  styleUrl: './download-item.component.scss',
})
export class DownloadItemComponent {
  @Input() label: Localized<string> = { en: '', de: '' };
  @Output() clicked = new EventEmitter();

  onClicked() {
    this.clicked.emit();
  }
}
