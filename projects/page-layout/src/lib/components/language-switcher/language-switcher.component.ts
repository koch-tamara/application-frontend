import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LanguageService } from '../../service/language.service';
import { RoutingService } from '../../service/routing.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [CommonModule, MatIconModule],
  selector: 'lib-language-switcher',
  styleUrl: './language-switcher.component.css',
  templateUrl: './language-switcher.component.html',
})
export class LanguageSwitcherComponent {
  private readonly languageService = inject(LanguageService);
  private readonly routingService = inject(RoutingService);

  public config = this.languageService.getLanguageConfiguration();

  public onLanguageChange(language: string): void {
    if (language == this.config.current) {
      return;
    }
    this.routingService.switchLanguage(language);
  };
}
