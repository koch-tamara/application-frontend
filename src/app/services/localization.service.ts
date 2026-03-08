import { Injectable, inject, LOCALE_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalizationService {
  private locale = inject(LOCALE_ID);

  get<T>(localized: Record<string, T>): T {
    const lang = this.locale.split('-')[0];
    return localized[lang] ?? localized['en'];
  }
}