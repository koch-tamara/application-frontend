import { inject, InjectionToken, Service } from '@angular/core';

export const LIB_LANGUAGE_CONFIG = new InjectionToken<ILanguageConfig>('LIB_LANGUAGE_CONFIG');

export interface ILanguageConfig {
    current: string;
    supported: string[];
}

@Service()
export class LanguageService {

    private languageConfig = inject(LIB_LANGUAGE_CONFIG);

    getLanguageConfiguration(): ILanguageConfig {
        return this.languageConfig;
    }
}
