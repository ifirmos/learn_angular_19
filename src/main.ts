import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/core/config/app.config';
import { AppShellComponent } from './app/core/layout/app-shell/app-shell.component';

bootstrapApplication(AppShellComponent, appConfig)
  .catch((err) => console.error(err));
