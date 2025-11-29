import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';

import { appRoutes } from '../../routing/app.routes';

import { TrilhasDataSource } from '../data-access/trilhas.datasource';
import { TrilhasStaticDataSource } from '../data-access/trilhas-static.datasource';

import { ProgressRepository } from '../data-access/progress.repository';
import { LocalStorageProgressRepository } from '../data-access/local-storage-progress.repository';

import { GlobalErrorHandler } from '../error-handling/global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(),
    providePrimeNG({ ripple: true }),

    { provide: ErrorHandler, useClass: GlobalErrorHandler },

    { provide: TrilhasDataSource, useClass: TrilhasStaticDataSource },
    { provide: ProgressRepository, useClass: LocalStorageProgressRepository },
  ],
};
