import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

import { appRoutes } from '../../routing/app.routes';

import { TrilhasDataSource } from '../data-access/trilhas.datasource';
import { TrilhasStaticDataSource } from '../data-access/trilhas-static.datasource';

import { ProgressRepository } from '../data-access/progress.repository';
import { LocalStorageProgressRepository } from '../data-access/local-storage-progress.repository';

import { GlobalErrorHandler } from '../error-handling/global-error-handler';

const LearnPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
      950: '#083344',
    },
    colorScheme: {
      dark: {
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(),
    // PrimeNG 21 – tema ciano sobre Aura. NÃO adicionar provideAnimations: PrimeNG 21 usa CSS nativo.
    providePrimeNG({
      theme: {
        preset: LearnPreset,
        options: { darkModeSelector: '.app-dark', cssLayer: false },
      },
      ripple: true,
    }),

    { provide: ErrorHandler, useClass: GlobalErrorHandler },

    { provide: TrilhasDataSource, useClass: TrilhasStaticDataSource },
    { provide: ProgressRepository, useClass: LocalStorageProgressRepository },
  ],
};
