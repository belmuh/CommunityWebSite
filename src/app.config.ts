import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core'
import { registerLocaleData } from '@angular/common';
import tr from '@angular/common/locales/tr';
import { DateAdapter, provideCalendar } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

registerLocaleData(tr);

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'tr' },
    provideCalendar({
        provide: DateAdapter,
        useFactory: adapterFactory
    }),
  ],
}
