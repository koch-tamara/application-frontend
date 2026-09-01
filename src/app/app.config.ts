import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { loadingInterceptor } from './services/interceptors/loading-interceptor';
import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import { errorInterceptor } from './services/interceptors/error-interceptor';
import { LIB_LANGUAGE_CONFIG } from '../../projects/page-layout/src/lib/service/language.service';
import { ELanguage } from 'shared-models';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withXhr(),
      withInterceptors([
        loadingInterceptor,
        errorInterceptor
      ])
    ),
    {
      provide: LIB_LANGUAGE_CONFIG,
      useFactory: (locale: string) => ({
        current: locale.split('-')[0],
        supported: ['de', 'en']
      }),
      deps: [LOCALE_ID]
    }
  ]
};
