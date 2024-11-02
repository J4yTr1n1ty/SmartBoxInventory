import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './root.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const rootConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()],
};
